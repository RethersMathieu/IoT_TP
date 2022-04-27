const mqtt = require("mqtt");

const URL = process.env.MQTT_URL || '';
module.exports = mqtt.connect(URL);
