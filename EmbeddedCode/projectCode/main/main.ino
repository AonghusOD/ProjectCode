/* Aonghus O Domhnaill
 * Student ID: G00293306 
 * Project Grow - Climate Monitor
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
#include <Ticker.h>
#include "DHTesp.h"

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
 * triggerGetTemp
 * Sets flag dhtUpdated to true for handling in loop()
 * called by Ticker tempTicker
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
void TaskLDR( void *pvParameters );
void TaskAir( void *pvParameters );
void TaskReadPH( void *pvParameters );
void TaskReadTDS( void *pvParameters );
void TaskReadClimate( void *pvParameters );
void TaskSendData( void *pvParameters );


// the setup function runs once when you press reset or power the board
void setup() {
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  
  //ph
  EEPROM.begin(32);//needed to permit storage of calibration value in eeprom
  ph.begin();

  //TDS
  gravityTds.setPin(TdsSensorPin);
  gravityTds.setAref(5.0);  //reference voltage on ADC, default 5.0V on Arduino UNO
  gravityTds.setAdcRange(4096);  //1024 for 10bit ADC;4096 for 12bit ADC
  gravityTds.begin();  //initialization

  //ldr
  pinMode(LIGHT_SENSOR_PIN,INPUT);
  adcAttachPin(LIGHT_SENSOR_PIN);
  
  // Now set up two tasks to run independently.

  xTaskCreate(
    TaskLDR
    ,  "Read LDR"
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

    // Initialize temperature sensor 1
  dhtSensor1.setup(dhtPin1, DHTesp::DHT22);
  // Initialize temperature sensor 2

  // Start task to get temperature
  xTaskCreatePinnedToCore(
      TaskReadClimate,                      /* Function to implement the task */
      "Temp & Humidity Readings ",                    /* Name of the task */
      4000,                          /* Stack size in words */
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



void TaskLDR(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  
  for (;;)
  {
    // read the input on analog pin A3:
    long LDRValue = analogRead(LIGHT_SENSOR_PIN);
    // print out the value you read:
    Serial.println(LDRValue);
     Serial.print("Core");
    Serial.println(xPortGetCoreID());
    vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
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
    vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
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
  vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
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
   vTaskDelay(1000);
  }
}

void TaskReadClimate(void *pvParameters) {
  Serial.println("tempTask loop started");
  for(;;)
  {
    if (tasksEnabled && !gotNewTemperature) { // Read temperature only if old data was processed already
      // Reading temperature for humidity takes about 250 milliseconds!
      // Sensor readings may also be up to 2 seconds 'old' (it's a very slow sensor)
      sensor1Data = dhtSensor1.getTempAndHumidity();  // Read values from sensor 1
      gotNewTemperature = true;
    }
   if (gotNewTemperature) {
   Serial.println("Sensor 1 data:");
    Serial.println("Temp: " + String(sensor1Data.temperature,2) + "'C Humidity: " + String(sensor1Data.humidity,1) + "%");
    gotNewTemperature = false;
  }
    vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskSendData(void *pvParameters)  // This is a task.
{
  //Send data to database
  for(;;)
  {}
}
