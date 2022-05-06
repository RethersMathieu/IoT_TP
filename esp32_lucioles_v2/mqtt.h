#include "sensors.h"
#include <PubSubClient.h>

//==== MQTT TOPICS ==============
#define TOPIC_TEMP "my/sensors/ym/topic_temp"
#define TOPIC_LED "my/sensors/ym/topic_led"
#define TOPIC_LIGHT "my/sensors/ym/topic_light"
#define TOPIC_LOCATION "my/sensors/ym/topic_location"
#define TOPIC_PROJECT "iot/M1Miage2022"

#define MQTT_CRED
#undef TLS_USE

/*===== MQTT broker/server and TOPICS ========*/
//String MQTT_SERVER = "192.168.1.101";
String MQTT_SERVER = "test.mosquitto.org";
//String MQTT_SERVER = "broker.hivemq.com";

//==== TLS =========
#ifdef TLS_USE
int MQTT_PORT =  8883; // for TLS cf https://test.mosquitto.org/
#else
int MQTT_PORT = 1883;
#endif

//==== MQTT Credentials =========
#ifdef MQTT_CRED
char *mqtt_id     = "deathstar";
char *mqtt_login  = "darkvador";
char *mqtt_passwd = "6poD2R2";
#else
char *mqtt_id     = "deathstar";
char *mqtt_login  = NULL;
char *mqtt_passwd = NULL;
#endif



#ifdef TLS_USE
PubSubClient client(secureClient); // MQTT client
#else
PubSubClient client(espClient);      // The ESP is a MQTT Client
#endif
//======METHODS============
void mqtt_pubcallback(char* topic, byte* message, unsigned int length);
void setup_mqtt_client();
void mqtt_connect();
void mqtt_subscribe(char *topic);
