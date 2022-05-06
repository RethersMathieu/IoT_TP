/*
 * Auteur : G.Menez
 */
#include "my_spiffs.h";
#include "ota.h";
#include "ArduinoJson.h";

#include "classic_setup.h";
#include "json.h";

String whoami; // Identification de CET ESP au sein de la flotte


void setup () {

  Serial.begin(9600);
  while (!Serial); // wait for a serial connection. Needed for native USB port only

  // Connexion Wifi
  connect_wifi();
  print_network_status();

  //Choix d'une identification pour cet ESP
  whoami =  String(WiFi.macAddress());

  // Initialize the LED
  setup_led(LEDpin, OUTPUT, LOW);

  // Init temperature sensor
  TempSensor.begin();

  // Initialize SPIFFS
  SPIFFS.begin(true);

  // MQTT broker connection
  setup_mqtt_client();
  mqtt_connect();

  /*------ Subscribe to TOPIC_LED  ---------*/
  mqtt_subscribe((char *)(TOPIC_LED));
}

/*================= LOOP ======================*/

void loop () {

  delay(10000);
  createJsonDoc();

  // Process MQTT ... obligatoire une fois par loop()
  client.loop(); 
}
