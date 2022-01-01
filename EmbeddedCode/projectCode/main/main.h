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
