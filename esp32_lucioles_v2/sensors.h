#include "OneWire.h"
#include "DallasTemperature.h"

OneWire oneWire(23); // Pour utiliser une entite oneWire sur le port 23
DallasTemperature TempSensor(&oneWire) ; // Cette entite est utilisee par le capteur de temperature

/*===== ESP GPIO configuration ==============*/
/* ---- LED         ----*/
const int LEDpin = 19; // LED will use GPIO pin 19
/* ---- Light       ----*/
const int LightPin = A5; // Read analog input on ADC1_CHANNEL_5 (GPIO 33)


//======METHODS============
void setup_led(int LEDpin, int mode, int status);
float get_temperature();
float get_light();
void set_pin(int pin, int val);
int get_pin(int pin);
