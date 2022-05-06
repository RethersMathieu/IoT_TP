/*===== WIFI =================================*/
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#ifdef TLS_USE
WiFiClientSecure secureClient;     // Avec TLS !!!
#else
WiFiClient espClient;                // Use Wifi as link layer
#endif

void connect_wifi();
void print_network_status();
