/* Aonghus O Domhnaill
 * Student ID: G00293306 
 * Project - Automate - Climate Monitor
 * Started code Week 10, used Arduino libraries to get base code for each sensor
 * Problems with PH module not giving correct reading
 * LDR,DHT22,CS811 - Are working as expected
 */

 /***********Notice and Trouble shooting TDS***************
 1. This code is tested on Arduino Uno with Arduino IDE 1.0.5 r2 and 1.8.2.
 2. Calibration CMD:
     enter -> enter the calibration mode
     cal:tds value -> calibrate with the known tds value(25^c). e.g.cal:707
     exit -> save the parameters and exit the calibration mode
 ****************************************************/
#include "FreeRTOS.h"
#include "Adafruit_CCS811.h"
#include "main.h"
#include "DFRobot_ESP_PH.h"
#include "EEPROM.h"
#include "GravityTDS.h"
#include "DHT.h"

//DHT22
#define DHTPIN 17
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
DHT dht(DHTPIN, DHTTYPE);
//PH
DFRobot_ESP_PH ph;
#define ESPADC 4096.0   //the esp Analog Digital Convertion value
#define ESPVOLTAGE 3300 //the esp voltage supply value
#define PH_PIN 26    //the esp gpio data pin number
float voltage, phValue, temperature = 25;


////CCS811
Adafruit_CCS811 ccs;
// define tasks
void TaskLDR( void *pvParameters );
void TaskAir( void *pvParameters );
void TaskReadTDS( void *pvParameters );
void TaskReadPH( void *pvParameters );
void TaskReadClimate( void *pvParameters );
void TaskSendData( void *pvParameters );

///TDS///
#define TdsSensorPin 35
GravityTDS gravityTds;
float tdsValue = 0;

// the setup function runs once when you press reset or power the board
void setup() {
  
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);

  Serial.println(F("DHTxx test!"));

  dht.begin();
  EEPROM.begin(32);//needed to permit storage of calibration value in eeprom
  ph.begin();

  //TDS
  gravityTds.setPin(TdsSensorPin);
  gravityTds.setAref(5.0);  //reference voltage on ADC, default 5.0V on Arduino UNO
  gravityTds.setAdcRange(4096);  //1024 for 10bit ADC;4096 for 12bit ADC
  gravityTds.begin();  //initialization
  
  ////////
  pinMode(LIGHT_SENSOR_PIN,INPUT);
  adcAttachPin(LIGHT_SENSOR_PIN);
  

  
  // Now set up two tasks to run independently.

  xTaskCreate(
    TaskLDR
    ,  "Light Readings"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL );
    
    xTaskCreatePinnedToCore(
    TaskReadPH
    ,  "PH Reading"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);

    xTaskCreatePinnedToCore(
    TaskReadClimate
    ,  "PH Reading"
    ,  4000  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL
    ,  1);
    
    xTaskCreatePinnedToCore(
    TaskAir
    ,  "Air Readings"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
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

    xTaskCreatePinnedToCore(
    TaskReadTDS
    ,  "Read TDS"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL 
    ,  1);

    vTaskStartScheduler();

  // Now the task scheduler, which takes over control of scheduling individual tasks, is automatically started.
}

void loop()
{
  // Empty. Things are done in Tasks.
}

/*--------------------------------------------------*/
/*---------------------- Tasks ---------------------*/
/*--------------------------------------------------*/

void TaskLDR(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  
  for (;;)
  {
    // read the input on analog pin A3:
    long LDRValue = analogRead(LIGHT_SENSOR_PIN);
    // print out the value you read:
    Serial.print("Light:");
    Serial.println(LDRValue);
     Serial.print("Core");
    Serial.println(xPortGetCoreID());
    vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}


void TaskAir(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  
  if(!ccs.begin()){
    Serial.println("Failed to start sensor! Please check your wiring.");
    while(1);
  }

  // Wait for the sensor to be ready
  while(!ccs.available());

  for (;;)
  {
    if(ccs.available()){
    if(!ccs.readData()){
      Serial.print("CO2: ");
      Serial.print(ccs.geteCO2());
      Serial.print("ppm, TVOC: ");
      Serial.println(ccs.getTVOC());
    }
    else{
      Serial.println("ERROR!");
      while(1);
    }
  }
  Serial.print("Core");
  Serial.println(xPortGetCoreID());
    vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadPH( void *pvParameters )
{
  for(;;){
  static unsigned long timepoint = millis();
  if (millis() - timepoint > 1000U) //time interval: 1s
  {
    timepoint = millis();
    //voltage = rawPinValue / esp32ADC * esp32Vin
    voltage = analogRead(PH_PIN) / ESPADC * ESPVOLTAGE; // read the voltage
    Serial.print("voltage:");
    Serial.println(voltage, 4);
    

    phValue = ph.readPH(voltage, 25); // convert voltage to pH with temperature compensation
    Serial.print("pH:");
    Serial.println(phValue, 4);
  }
  vTaskDelay(10000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskReadTDS( void *pvParameters ){
  for(;;){
  //temperature = readTemperature();  //add your temperature sensor and read it
    gravityTds.setTemperature(temperature);  // set the temperature and execute temperature compensation
    gravityTds.update();  //sample and calculate 
    tdsValue = gravityTds.getTdsValue();  // then get the value
    Serial.print("TDS:");
    Serial.print(tdsValue,0);
    Serial.println("ppm");
   vTaskDelay(10000);
  }
}

void TaskReadClimate( void *pvParameters ){
   // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
//  if (isnan(h) || isnan(t) || isnan(f)) {
//    Serial.println(F("Failed to read from DHT sensor!"));
//    return;
//  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.print(F("°F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("°C "));
  Serial.print(hif);
  Serial.println(F("°F"));
  vTaskDelay(10000); 
}

void TaskSendData(void *pvParameters)  // This is a task.
{
  //Send data to database
  for(;;)
  {}
}
