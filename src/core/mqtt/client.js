const mqtt = require("mqtt");
require("../../env/env");

const URL = process.env.MQTT_URL || 'http://test.mosquitto.org:1883';
module.exports = mqtt.connect(URL);
