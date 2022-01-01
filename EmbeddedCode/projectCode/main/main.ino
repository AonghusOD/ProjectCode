/* Aonghus O Domhnaill
 * Student ID: G00293306 
 * Project - Automate - Climate Monitor
 * Started code Week 10, used Arduino libraries to get base code for each sensor
 * Problems with PH module not giving correct reading
 * LDR,DHT22,CS811 - Are working as expected
 */

#include "Adafruit_CCS811.h"
#include "main.h"

////CCS811
Adafruit_CCS811 ccs;
// define tasks for Blink & AnalogRead
void TaskBlink( void *pvParameters );
void TaskLDR( void *pvParameters );
void TaskAir( void *pvParameters );
void TaskSendData( void *pvParameters );

// the setup function runs once when you press reset or power the board
void setup() {
  pinMode(LIGHT_SENSOR_PIN,INPUT);
  adcAttachPin(LIGHT_SENSOR_PIN);
  
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  
  // Now set up two tasks to run independently.

  xTaskCreate(
    TaskLDR
    ,  "AnalogReadA3"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL );

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
    ,  "AnalogReadA3"
    ,  1024  // Stack size
    ,  NULL
    ,  1  // Priority
    ,  NULL 
    ,  1);

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

void TaskSendData(void *pvParameters)  // This is a task.
{
  //Send data to database
  for(;;)
  {}
}
