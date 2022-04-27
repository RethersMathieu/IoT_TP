const mqtt = require("mqtt");

const URL = 'http://broker.hivemq.com';
module.exports = mqtt.connect(URL);
