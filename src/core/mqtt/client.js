const mqtt = require("mqtt");
require("../../env/env");

const URL = process.env.MQTT_URL || '';
module.exports = mqtt.connect(URL);
