/* Aonghus O Domhnaill
   Student ID: G00293306
   Environment Monitor
   Started code Week 10, used Arduino libraries to get base code for each sensor
   Problems with PH module not giving correct reading
   LDR,DHT22,CS811 - Are working as expected
*/

/***********Notice and Trouble shooting TDS***************
  1. This code is tested on Arduino Uno with Arduino IDE 1.0.5 r2 and 1.8.2.
  2. Calibration CMD:
     enter -> enter the calibration mode
     cal:tds value -> calibrate with the known tds value(25^c). e.g.cal:707
     exit -> save the parameters and exit the calibration mode
 ****************************************************/
//Header Files SD
#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include "ArduinoJson.h"

//added task.h if any problems
#include <FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/queue.h>
#include <freertos/event_groups.h>
#include <freertos/semphr.h>



#include "Adafruit_CCS811.h"
#include "main.h"
#include "DFRobot_ESP_PH.h"
#include "EEPROM.h"
#include "GravityTDS.h"
#include <Ticker.h>
#include "DHTesp.h"
#include "DHT.h"
#include <Arduino.h>
#include <hp_BH1750.h>  //  include the library
//saves the bootCount variable on the RTC memory.
RTC_DATA_ATTR int bootCount = 0;

#define uS_TO_S_FACTOR 1000000ULL  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  20        /* Time ESP32 will go to sleep (in seconds) */

SemaphoreHandle_t Air_Semaphore = NULL;

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
#define DHTPIN 17     // Digital pin connected to the DHT sensor
EventGroupHandle_t SwitchEventGroup = NULL;
#define climateBit (1<<0)
#define airBit (1<<1)
#define phBit (1<<2)
#define tdsBit (1<<3)
#define luxBit (1<<4)

typedef struct {
  uint8_t sensor;
  uint32_t qData;
  uint32_t qData2;
} dataStruct;

#define CLIMATE_ID 0
#define AIR_ID 1
#define PH_ID 2
#define TDS_ID 3
#define LUX_ID 4

TaskHandle_t climateHandle;
TaskHandle_t airHandle;
TaskHandle_t phHandle;
TaskHandle_t tdsHandle;
TaskHandle_t luxHandle;

DHT dht(DHTPIN, DHTTYPE);
///////////////////////////////////////JSON STUFF
const int chipSelect = 5;

const char *filename = "/test.jso";  // <- SD library uses 8.3 filenames

File myFileSDCart;

JsonObject getJSonFromFile(DynamicJsonDocument *doc, String filename, bool forceCleanONJsonError = true ) {
  // open the file for reading:
  myFileSDCart = SD.open(filename);
  if (myFileSDCart) {
    // read from the file until there's nothing else in it:
    //          if (myFileSDCart.available()) {
    //              firstWrite = false;
    //          }

    DeserializationError error = deserializeJson(*doc, myFileSDCart);
    if (error) {
      // if the file didn't open, print an error:
      Serial.print(F("Error parsing JSON "));
      Serial.println(error.c_str());

      if (forceCleanONJsonError) {
        return doc->to<JsonObject>();
      }
    }

    // close the file:
    myFileSDCart.close();

    return doc->as<JsonObject>();
  } else {
    // if the file didn't open, print an error:
    Serial.print(F("Error opening (or file not exists) "));
    Serial.println(filename);

    Serial.println(F("Empty json created"));
    return doc->to<JsonObject>();
  }

}

bool saveJSonToAFile(DynamicJsonDocument *doc, String filename) {
  SD.remove(filename);

  // open the file. note that only one file can be open at a time,
  // so you have to close this one before opening another.
  Serial.println(F("Open file in write mode"));
  myFileSDCart = SD.open(filename, FILE_WRITE);
  if (myFileSDCart) {
    Serial.print(F("Filename --> "));
    Serial.println(filename);

    Serial.print(F("Start write..."));

    serializeJson(*doc, myFileSDCart);

    Serial.print(F("..."));
    // close the file:
    myFileSDCart.close();
    Serial.println(F("done."));

    return true;
  } else {
    // if the file didn't open, print an error:
    Serial.print(F("Error opening "));
    Serial.println(filename);

    return false;
  }
}


void printFile(const char *filename) {
  // Open file for reading
  File file = SD.open(filename);
  if (!file) {
    Serial.println(F("Failed to read file"));
    return;
  }

  // Extract each characters by one by one
  while (file.available()) {
    Serial.print((char) file.read());
  }
  Serial.println();

  // Close the file
  file.close();
}
//----------------------------------------------------------------------

QueueHandle_t data_Queue = xQueueCreate(15, sizeof(dataStruct));

hp_BH1750 BH1750;       //  create the sensor

//PH
DFRobot_ESP_PH ph;
#define ESPADC 4096.0   //the esp Analog Digital Convertion value
#define ESPVOLTAGE 3300 //the esp voltage supply value
#define PH_PIN 26    //the esp gpio data pin number
float voltage, phValue, temperature = 25;

///TDS///
#define TdsSensorPin 35
GravityTDS gravityTds;
float tdsValue = 0;

////CCS811
Adafruit_CCS811 ccs;


// define tasks for
void TaskSDWrite( void *pvParameters );
void TaskAir( void *pvParameters );
void TaskReadPH( void *pvParameters );
void TaskReadTDS( void *pvParameters );
void TaskReadLux( void *pvParameters );
void TaskSendData( void *pvParameters );
void climateTask(void *pvParameters);

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);
  Air_Semaphore = xSemaphoreCreateBinary();
  //  vTaskSuspend(climateHandle);
  //  vTaskSuspend(airHandle);
  //  vTaskSuspend(phHandle);
  //  vTaskSuspend(tdsHandle);
  //vTaskResume(luxHandle);

  // initialize serial communication at 115200 bits per second:


  vQueueAddToRegistry(data_Queue, "Data Queue"); // just for debug




  //JSON
  while (!Serial)
    continue;

  while (!SD.begin(chipSelect)) {
    Serial.println(F("Failed to initialize SD library"));
    delay(1000);
  }

  Serial.println(F("SD library initialized"));

  Serial.println(F("Delete original file if exists!"));
  SD.remove(filename);
  //BH1750
  bool avail = BH1750.begin(BH1750_TO_GROUND);

  //ph
  EEPROM.begin(32);//needed to permit storage of calibration value in eeprom


  //ph
  ph.begin();

  //TDS
  gravityTds.setPin(TdsSensorPin);
  gravityTds.setAref(5.0);  //reference voltage on ADC, default 5.0V on Arduino UNO
  gravityTds.setAdcRange(4096);  //1024 for 10bit ADC;4096 for 12bit ADC
  gravityTds.begin();  //initialization

  ccs.begin();
  dht.begin();

  vTaskDelay(1000);
  // Now set up two tasks to run independently.
  //
  xTaskCreatePinnedToCore(
    TaskSDWrite
    ,  "SD Write"
    ,  3056  // Stack size
    ,  NULL
    ,  4  // Priority
    ,  NULL
    ,  0);

  xTaskCreatePinnedToCore(
    TaskReadPH
    ,  "PH Reading"
    ,  1024  // Stack size
    ,  NULL
    ,  3  // Priority
    ,  &phHandle
    ,  1);

  xTaskCreatePinnedToCore(
    TaskReadTDS
    ,  "Read TDS"
    ,  1024  // Stack size
    ,  NULL
    ,  3  // Priority
    ,  &tdsHandle
    ,  1);

  xTaskCreatePinnedToCore(
    TaskAir
    ,  "Read Air"
    ,  2056  // Stack size
    ,  NULL
    ,  4  // Priority
    ,  &airHandle
    ,  0);

  xTaskCreatePinnedToCore(
    TaskReadLux
    ,  "Read Lux"
    ,  2024  // Stack size
    ,  NULL
    ,  3  // Priority
    ,  &luxHandle
    ,  1);

  xTaskCreatePinnedToCore(
    climateTask
    ,  "Read Climate"
    ,  3024  // Stack size
    ,  NULL
    ,  3  // Priority
    ,  &climateHandle
    ,  1);

  xTaskCreatePinnedToCore(
    TaskSendData
    ,  "Send Data"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);/* Core where the task should run */

  
  SwitchEventGroup = xEventGroupCreate();
  //Sleep-Timer Stuff

  //Increment boot number and print it every reboot
  ++bootCount;
  Serial.println("Boot number: " + String(bootCount));

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  EventBits_t saveSD_EventBits;
  saveSD_EventBits = xEventGroupWaitBits(SwitchEventGroup, luxBit | phBit | airBit | tdsBit | climateBit, pdTRUE, pdTRUE, portMAX_DELAY);
  if (saveSD_EventBits & (luxBit | phBit | airBit | tdsBit | climateBit)) {
    Serial.println("Bits set going to sleep");
    printFile(filename);
    esp_deep_sleep_start();
  }


  //
  // Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) +
  //  " Seconds");
  //  esp_deep_sleep_start();

  // Now the task scheduler, which takes over control of scheduling individual tasks, is automatically started.
}

void loop()
{
  // Empty. Things are done in Tasks.
}

/*--------------------------------------------------*/
/*---------------------- Tasks ---------------------*/
/*--------------------------------------------------*/



void TaskSDWrite(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  dataStruct received_Data;

  DynamicJsonDocument doc(1024);

  JsonObject obj;
  obj = getJSonFromFile(&doc, filename);

  obj[F("millis")] = millis();

  JsonArray data;

  // Check if exist the array
  if (!obj.containsKey(F("data"))) {
    Serial.println(F("Not find data array! Crete one!"));
    data = obj.createNestedArray(F("data"));
  } else {
    Serial.println(F("Find data array!"));
    data = obj[F("data")];
  }
  //int received_Data = 0;
  for (;;)
  {
    if (xQueueReceive(data_Queue, &received_Data, portMAX_DELAY) == pdTRUE) {
      Serial.print("Received From Queue:");
      Serial.println(received_Data.sensor);
      // create an object to add to the array
      JsonObject objArrayData = data.createNestedObject();

      switch (received_Data.sensor) {
        case CLIMATE_ID:
          {
            objArrayData["Temperature"] = received_Data.qData;
            objArrayData["Humidity"] = received_Data.qData2;
            boolean isSaved = saveJSonToAFile(&doc, filename);
            Serial.println("1 About to set climate Bit set");
            xEventGroupSetBits(SwitchEventGroup, climateBit);
            Serial.println("Climate Bit set");
            vTaskSuspend(climateHandle);
            vTaskDelay(100);
            if (isSaved) {
              Serial.println("File saved!");
            } else {
              Serial.println("Error on save File!");
            }
            break;
          }
        case AIR_ID:
          {
            objArrayData["CO2"] = received_Data.qData;
            objArrayData["HVOC"] = received_Data.qData2;
            boolean isSaved = saveJSonToAFile(&doc, filename);
            Serial.println("2 About to set air Bit set");
            //xEventGroupSetBits(SwitchEventGroup, airBit);
            Serial.println("Air Bit set and give semaphore");
            xSemaphoreGive( Air_Semaphore );
            //vTaskSuspend(airHandle);
            if (isSaved) {
              Serial.println("File saved!");
            } else {
              Serial.println("Error on save File!");
            }
            break;
          }
        case PH_ID:
          {
            objArrayData["PH"] = received_Data.qData;
            boolean isSaved = saveJSonToAFile(&doc, filename);
            Serial.println("3 About to set ph Bit set");
            xEventGroupSetBits(SwitchEventGroup, phBit);
            Serial.println("About to set ph Bit set");
            Serial.println("PH Bit set");
            vTaskSuspend(phHandle);
            if (isSaved) {
              Serial.println("File saved!");
            } else {
              Serial.println("Error on save File!");
            }
            break;
          }
        case TDS_ID:
          {
            objArrayData["TDS"] = received_Data.qData;
            boolean isSaved = saveJSonToAFile(&doc, filename);
            Serial.println("4 About to set tds Bit set");
            xEventGroupSetBits(SwitchEventGroup, tdsBit);
            Serial.println("TDS Bit set");
            vTaskSuspend(tdsHandle);
            if (isSaved) {
              Serial.println("File saved!");
            } else {
              Serial.println("Error on save File!");
            }
            break;
          }
        case LUX_ID:
          {
            objArrayData["LUX"] = received_Data.qData;
            boolean isSaved = saveJSonToAFile(&doc, filename);
            Serial.println("5 About to set lux Bit set");
            xEventGroupSetBits(SwitchEventGroup, luxBit);
            Serial.println("lux Bit set");
            vTaskSuspend(luxHandle);
            if (isSaved) {
              Serial.println("File saved!");
            } else {
              Serial.println("Error on save File!");
            }
            break;
          }
      }

      Serial.print("Core");
      Serial.println(xPortGetCoreID());
      //      // Print test file
      //      Serial.println(F("Print test file..."));
      //      printFile(filename);
      vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
    }
  }

}
void TaskAir(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  
  dataStruct AirData;
  if (!ccs.begin()) {
    Serial.println("Failed to start sensor! Please check your wiring.");
    while (1);
  }

  // Wait for the sensor to be ready
  while (!ccs.available());

  for (;;)
  {

    if (ccs.available()) {
      
      if (!ccs.readData()) {
        vTaskDelay(10000);
        Serial.print("CO2: ................");
        Serial.print(ccs.geteCO2());
        Serial.print("ppm, TVOC: ");
        Serial.println(ccs.getTVOC());
        AirData.sensor = AIR_ID;
        AirData.qData = ccs.geteCO2();
        AirData.qData2 = ccs.getTVOC();
        xQueueSend(data_Queue, &AirData, 0);
      }
      else {
        Serial.println("ERROR!");
        while (1);
      }
    }
    Serial.print("Core");
    Serial.println(xPortGetCoreID());
    //vTaskSuspend( NULL );
    // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadPH( void *pvParameters )
{
  dataStruct PHData;
  for (;;) {
    vTaskDelay(1000);
    static unsigned long timepoint = millis();
    if (millis() - timepoint > 1000U) //time interval: 1s
    {
      timepoint = millis();
      //voltage = rawPinValue / esp32ADC * esp32Vin
      voltage = analogRead(PH_PIN) / ESPADC * ESPVOLTAGE; // read the voltage
      Serial.print("voltage:");
      Serial.println(voltage, 4);


      phValue = ph.readPH(voltage, 19); // convert voltage to pH with temperature compensation
      Serial.print("pH:");
      Serial.println(phValue, 4);
      PHData.sensor = PH_ID;
      PHData.qData = phValue;
      xQueueSend(data_Queue, &PHData, 0);
      vTaskDelay(10000);
    }
    //vTaskSuspend( NULL );
    // vTaskDelay(100);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadTDS( void *pvParameters ) {
  dataStruct TDSData;
  for (;;) {
    vTaskDelay(1000);
    //temperature = readTemperature();  //add your temperature sensor and read it
    gravityTds.setTemperature(temperature);  // set the temperature and execute temperature compensation
    gravityTds.update();  //sample and calculate
    tdsValue = gravityTds.getTdsValue();  // then get the value
    Serial.print("TDS:");
    Serial.print(tdsValue, 0);

    Serial.println("ppm");
    TDSData.sensor = TDS_ID;
    TDSData.qData = tdsValue;
    xQueueSend(data_Queue, &TDSData, 0);
    vTaskDelay(10000);
    // vTaskSuspend( NULL );
    //vTaskDelay(100);
  }
}

void TaskReadLux( void *pvParameters )
{
  dataStruct LuxData;
  for (;;)
  {
    if ( xSemaphoreTake( Air_Semaphore, ( TickType_t ) 5 ) == pdTRUE )
    {
      BH1750.start();   //starts a measurement
      float lux = BH1750.getLux(); //  waits until a conversion finished
      Serial.print("Light..............................");
      Serial.println(lux);
      Serial.print("Core");
      Serial.println(xPortGetCoreID());
      LuxData.sensor = LUX_ID;
      LuxData.qData = lux;
      xQueueSend(data_Queue, &LuxData, 0);
      }
      vTaskDelay(10000);
      //vTaskSuspend( NULL );
      // one tick delay (15ms) in between reads for stability
    
  }
}

void climateTask(void *pvParameters)  // This is a task.
{
  //Send data to database
  dataStruct ClimateData;
  for (;;)
  {
    delay(2000);

    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    // Compute heat index in Fahrenheit (the default)
    float hif = dht.computeHeatIndex(f, h);
    // Compute heat index in Celsius (isFahreheit = false)
    float hic = dht.computeHeatIndex(t, h, false);
    ClimateData.sensor = CLIMATE_ID;
    ClimateData.qData = t;
    ClimateData.qData2 = h;
    xQueueSend(data_Queue, &ClimateData, 0);
    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.print(F("°C "));

  }
}

void TaskSendData(void *pvParameters)  // This is a task.
{
  //Send data to database
  for (;;)
  {}
}
