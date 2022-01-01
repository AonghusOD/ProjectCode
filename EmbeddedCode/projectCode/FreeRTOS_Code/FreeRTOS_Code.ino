//ccs811
#include "Adafruit_CCS811.h"
#if CONFIG_FREERTOS_UNICORE
#define ARDUINO_RUNNING_CORE 0
#else
#define ARDUINO_RUNNING_CORE 1
#endif

#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

//LDR
long LDRValue = 0;
#define LIGHT_SENSOR_PIN 36 // ESP32 pin 34??

////CCS811
Adafruit_CCS811 ccs;
// define tasks for Blink & AnalogRead
void TaskBlink( void *pvParameters );
void TaskLDR( void *pvParameters );
void TaskAir( void *pvParameters );

// the setup function runs once when you press reset or power the board
void setup() {
  pinMode(LIGHT_SENSOR_PIN,INPUT);
  adcAttachPin(LIGHT_SENSOR_PIN);
  
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  
  // Now set up two tasks to run independently.
  xTaskCreatePinnedToCore(
    TaskBlink
    ,  "TaskBlink"   // A name just for humans
    ,  1024  // This stack size can be checked & adjusted by reading the Stack Highwater
    ,  NULL
    ,  2  // Priority, with 3 (configMAX_PRIORITIES - 1) being the highest, and 0 being the lowest.
    ,  NULL 
    ,  ARDUINO_RUNNING_CORE);

  xTaskCreatePinnedToCore(
    TaskLDR
    ,  "AnalogReadA3"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL 
    ,  ARDUINO_RUNNING_CORE);

    xTaskCreatePinnedToCore(
    TaskAir
    ,  "AnalogReadA3"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL 
    ,  ARDUINO_RUNNING_CORE);

  // Now the task scheduler, which takes over control of scheduling individual tasks, is automatically started.
}

void loop()
{
  // Empty. Things are done in Tasks.
}

/*--------------------------------------------------*/
/*---------------------- Tasks ---------------------*/
/*--------------------------------------------------*/

void TaskBlink(void *pvParameters)  // This is a task.
{
  (void) pvParameters;

/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
    
  If you want to know what pin the on-board LED is connected to on your ESP32 model, check
  the Technical Specs of your board.
*/

  // initialize digital LED_BUILTIN on pin 13 as an output.
  pinMode(LED_BUILTIN, OUTPUT);

  for (;;) // A Task shall never return or exit.
  {
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    vTaskDelay(100);  // one tick delay (15ms) in between reads for stability
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    vTaskDelay(100);  // one tick delay (15ms) in between reads for stability
  }
}

void TaskLDR(void *pvParameters)  // This is a task.
{
  (void) pvParameters;
  
  for (;;)
  {
    // read the input on analog pin A3:
    long LDRValue = analogRead(LIGHT_SENSOR_PIN);
    // print out the value you read:
    Serial.println(LDRValue);
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
    vTaskDelay(1000);  // one tick delay (15ms) in between reads for stability
  }
}
