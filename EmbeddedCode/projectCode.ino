/* Aonghus O Domhnaill
 * Student ID: G00293306 
 * Project - Automate - Climate Monitor
 * Started code Week 10, used Arduino libraries to get base code for each sensor
 * Problems with PH module not giving correct reading
 * LDR,DHT22,CS811 - Are working as expected
 */
#include "Adafruit_CCS811.h"
#include "DHT.h"

///PH 
const int heatpin = 4;
const int phPin = 36;
//float calibration_value = 21.34 - 0.7;
int phval = 0; 
unsigned long int avgval; 
int buffer_arr[10],temp;
 float ph_act;

//float calibration_value = 21.34;
//int voltage[10],temp;
//float phValue = 0;
//float phval;

///DHT 
#define DHTPIN 5     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
DHT dht(DHTPIN, DHTTYPE);

//LDR CODE
//int sensorPin = 2; // select the input pin for LDR
/** Pin number for LDR analog input pin */
//int ldrPin = 35;
/** LDR light value = 0 if not updated */
long newLDRValue = 0;
#define LIGHT_SENSOR_PIN 34 // ESP32 pin GIOP36 (ADC0)

////CCS811
Adafruit_CCS811 ccs;

int sensorValue = 0; // variable to store the value coming from the sensor


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.println(("DHTxx test!"));
  Serial.println("CCS811 test");
//////////LDR ////////////////////
 // Initialize analog port for LDR
  pinMode(LIGHT_SENSOR_PIN,INPUT);
  adcAttachPin(LIGHT_SENSOR_PIN);
  //analogReadResolution(11);
  //analogSetAttenuation(ADC_6db);
  
  ///ph code///
  pinMode(phPin, INPUT);
  
  if(!ccs.begin()){
    Serial.println("Failed to start sensor! Please check your wiring.");
    while(1);
  }

  // Wait for the sensor to be ready
  while(!ccs.available());
  dht.begin();

}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);

  int analogValue = analogRead(LIGHT_SENSOR_PIN);

  Serial.print("Analog Value = ");
  Serial.println(analogValue);   
  
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

  //PH///////////////////////////////
  for(int i=0;i<10;i++) 
 { 
 buffer_arr[i]=analogRead(phPin);
 delay(30);
 }
 for(int i=0;i<9;i++)
 {
 for(int j=i+1;j<10;j++)
 {
 if(buffer_arr[i]>buffer_arr[j])
 {
 temp=buffer_arr[i];
 buffer_arr[i]=buffer_arr[j];
 buffer_arr[j]=temp;
 }
 }
 }
 avgval=0;
 for(int i=2;i<8;i++)
 avgval+=buffer_arr[i];
 float volt=(float)avgval*5.0/1024/6; //convert the analog into millivolt
 ph_act = 3.5*volt; //convert the millivolt into pH value
 
 Serial.print("pH Val: ");
 Serial.println(ph_act);
 Serial.println(heatpin);
}
