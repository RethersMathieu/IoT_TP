void createJsonDoc(){
  
  StaticJsonDocument<1000> jsondoc;
  jsondoc["status"]["temperature"] = get_temperature();
  jsondoc["status"]["light"] = get_light();

  jsondoc["info"]["user"] = "Yannick";
  jsondoc["info"]["ssid"] = String(WiFi.SSID());
  jsondoc["info"]["ident"] = whoami;
  jsondoc["info"]["ip"] = WiFi.localIP().toString();

   char jsonChar[256];

  size_t sizeJSONProject = serializeJson(jsondoc, jsonChar);

  Serial.print("Published JSON PROJECT : ");
  Serial.println(jsonChar);
  client.publish(TOPIC_PROJECT, jsonChar, sizeJSONProject);
}
