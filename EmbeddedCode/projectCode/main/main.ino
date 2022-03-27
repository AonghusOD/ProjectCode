/* Aonghus O Domhnaill
   Student ID: G00293306
   Project Grow - Climate Monitor
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


#include "Adafruit_CCS811.h"
#include "main.h"
#include "DFRobot_ESP_PH.h"
#include "EEPROM.h"
#include "GravityTDS.h"
#include <Ticker.h>
#include "DHTesp.h"
#include <Arduino.h>
#include <hp_BH1750.h>  //  include the library
//typedef struct {
//  uint8_t sensor;
//  uint8_t qData;
//  uint32_t qData2;
//} dataStruct;
//
//#define CO2_ID 0
//#define TVOC_ID 1


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

QueueHandle_t data_Queue = xQueueCreate(5, sizeof(int));

hp_BH1750 BH1750;       //  create the sensor


//DHT22
DHTesp dhtSensor1;
/** Task handle for the light value read task */
TaskHandle_t tempTaskHandle = NULL;
/** Pin number for DHT11 1 data pin */
int dhtPin1 = 17;

Ticker tempTicker;
/** Flags for temperature readings finished */
bool gotNewTemperature = false;
/** Data from sensor 1 */
TempAndHumidity sensor1Data;

/* Flag if main loop is running */
bool tasksEnabled = false;

/**
   triggerGetTemp
   Sets flag dhtUpdated to true for handling in loop()
   called by Ticker tempTicker
*/
void triggerGetTemp() {
  if (tempTaskHandle != NULL) {
    xTaskResumeFromISR(tempTaskHandle);
  }
}

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
void TaskReadClimate( void *pvParameters );
void TaskReadLux( void *pvParameters );
void TaskSendData( void *pvParameters );


// the setup function runs once when you press reset or power the board
void setup() {
  // initialize serial communication at 115200 bits per second:
  Serial.begin(9600);
  while (!Serial)
    continue;
  ////JSON
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

  // Now set up two tasks to run independently.
  //
  xTaskCreatePinnedToCore(
    TaskSDWrite
    ,  "SD Write"
    ,  6056  // Stack size
    ,  NULL
    ,  4  // Priority
    ,  NULL
    ,  1);

  xTaskCreatePinnedToCore(
    TaskReadPH
    ,  "PH Reading"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);

  xTaskCreatePinnedToCore(
    TaskReadTDS
    ,  "Read TDS"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);

  xTaskCreatePinnedToCore(
    TaskAir
    ,  "Read Air"
    ,  2056  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  0);

  xTaskCreatePinnedToCore(
    TaskReadLux
    ,  "Read Lux"
    ,  1024  // Stack size
    ,  NULL
    ,  2  // Priority
    ,  NULL
    ,  1);

  xTaskCreatePinnedToCore(
    TaskSendData
    ,  "Send Data"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);

  // Initialize temperature sensor 1
  dhtSensor1.setup(dhtPin1, DHTesp::DHT22);
  // Initialize temperature sensor 2

  // Start task to get temperature
  xTaskCreatePinnedToCore(
    TaskReadClimate,                      /* Function to implement the task */
    "Temp & Humidity Readings ",                    /* Name of the task */
    2000,                          /* Stack size in words */
    NULL,                          /* Task input parameter */
    5,                              /* Priority of the task */
    &tempTaskHandle,                /* Task handle. */
    1);                            /* Core where the task should run */

  if (tempTaskHandle == NULL) {
    Serial.println("[ERROR] Failed to start task for temperature update");
  } else {
    // Start update of environment data every 30 seconds
    tempTicker.attach(0, triggerGetTemp);
  }

  // Signal end of setup() to tasks
  tasksEnabled = true;


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
  int received_Data = 0;
  for (;;)
  {
    if (xQueueReceive(data_Queue, &received_Data, portMAX_DELAY) == pdTRUE) {
      Serial.print("Received From Queue:");
      Serial.println(received_Data);
      // create an object to add to the array
      JsonObject objArrayData = data.createNestedObject();

      objArrayData["prevNumOfElem"] = received_Data;
      objArrayData["newNumOfElem"] = received_Data + 1;

      boolean isSaved = saveJSonToAFile(&doc, filename);

      if (isSaved) {
        Serial.println("File saved!");
      } else {
        Serial.println("Error on save File!");
      }

      Serial.print("Core");
      Serial.println(xPortGetCoreID());
      // Print test file
      Serial.println(F("Print test file..."));
      printFile(filename);
      vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
    }
  }

}
void TaskAir(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
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
        Serial.print("CO2: ................");
        Serial.print(ccs.geteCO2());
        Serial.print("ppm, TVOC: ");
        Serial.println(ccs.getTVOC());
      }
      else {
        Serial.println("ERROR!");
        while (1);
      }
    }
    Serial.print("Core");
    Serial.println(xPortGetCoreID());
    vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadPH( void *pvParameters )
{
  for (;;) {
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
    }
    vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadTDS( void *pvParameters ) {
  int sendData = 0;
  for (;;) {
    //temperature = readTemperature();  //add your temperature sensor and read it
    gravityTds.setTemperature(temperature);  // set the temperature and execute temperature compensation
    gravityTds.update();  //sample and calculate
    tdsValue = gravityTds.getTdsValue();  // then get the value
    Serial.print("TDS:");
    Serial.print(tdsValue, 0);
    sendData = tdsValue;
    xQueueSend(data_Queue, &sendData, 0);
    Serial.println("ppm");
    vTaskDelay(10000);
  }
}


void TaskReadClimate(void *pvParameters) {
  Serial.println("tempTask loop started");
  int tempTemp = 0;
  int tempHumidity = 0;
  for (;;)
  {
    if (tasksEnabled && !gotNewTemperature) { // Read temperature only if old data was processed already
      // Reading temperature for humidity takes about 250 milliseconds!
      // Sensor readings may also be up to 2 seconds 'old' (it's a very slow sensor)
      sensor1Data = dhtSensor1.getTempAndHumidity();  // Read values from sensor 1
      gotNewTemperature = true;
    }
    if (gotNewTemperature) {
      Serial.println("Sensor 1 data:");
      Serial.println("Temp: " + String(sensor1Data.temperature, 2) + "'C Humidity: " + String(sensor1Data.humidity, 1) + "%");
      tempTemp = sensor1Data.temperature;
      xQueueSend(data_Queue, &tempTemp, 0);
      //tempHumidity = sensor1Data.humidity;
      //xQueueSend(data_Queue, &tempHumidity, 0);
      gotNewTemperature = false;
    }
    vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadLux( void *pvParameters )
{
  //Send data to database
  for (;;)
  {
    // put your main code here, to run repeatedly:
    BH1750.start();   //starts a measurement
    float lux = BH1750.getLux(); //  waits until a conversion finished
    Serial.print("Light..............................");
    Serial.println(lux);
    Serial.print("Core");
    Serial.println(xPortGetCoreID());
    vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskSendData(void *pvParameters)  // This is a task.
{
  //Send data to database
  for (;;)
  {}
}
