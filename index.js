const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');
require('dotenv').config();

function isJSON(str) {
    let obj;
    try { obj = JSON.parse(str); }
    catch (err) { return undefined; }
    return obj;
}

async function initMongo() {
    console.log('CONNECTING TO MONGODB');
    return await require("./src/core/database/db");
}

async function initMQTT(dbo) {
    console.log('CONNECTING TO MQTT');
    const mqtt_client = require("./src/core/mqtt/client");
    const TOPIC_LIGHT = "my/sensors/ym/topic_light";
    const TOPIC_TEMP = "my/sensors/ym/topic_temp";
    mqtt_client.on("connect", function () {
        mqtt_client.subscribe(TOPIC_TEMP, function (err) {
            if (err) throw new Error(`ERROR SUBSCRIBE TOPIC: ${TOPIC_TEMP}.`);
        });
        mqtt_client.subscribe(TOPIC_LIGHT, function (err) {
            if (err) throw new Error(`ERROR SUBSCRIBE TOPIC: ${TOPIC_LIGHT}.`);
        });
    });
    mqtt_client.on("message", function (topic, message) {
        console.log("\nMQTT message on TOPIC:", topic.toString());
        console.log("Message payload", message.toString());
        let msg;

        if (!(msg = isJSON(message.toString())) && lodash.isUndefined(msg.who) && lodash.isUndefined(msg.value)) {
            console.error('Message refused');
            return;
        }

        const whoList = [];
        if (!whoList.find(({ who }) => who === msg.who)) whoList.push(msg);
        console.log("wholist using the node server :", whoList);
        const date = new Date().toLocaleString("sv-SE", {
            timeZone: "Europe/Paris",
        });
        const new_entry = { date, who: msg.who, value: msg.value };

        const key = path.parse(topic.toString()).base;
        dbo.collection(key).insertOne(new_entry, function (err, res) {
            if (err) return err;
            console.log('\nItem:', `${JSON.stringify(new_entry)}`, '\ninserted in db in collection:', key);
        });
    });
    return mqtt_client;
}

async function init() {
    console.log('INIT APP');
    const dbo = await initMongo();
    const mqtt_client = await initMQTT(dbo);
    const router = require('./src/routers/router')(dbo);
    app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname,'src', 'pages')));
    app.use(express.static(path.join(__dirname, "/")));
    app.use(function (request, response, next) {
        //Pour eviter les problemes de CORS/REST
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "*");
        response.header(
            "Access-Control-Allow-Methods",
            "POST, GET, OPTIONS, PUT, DELETE"
        );
        next();
    });
    app.use(router);
    listener = app.listen(process.env.PORT || 3000, function () {
        console.log("Express Listening on port", listener.address().port);
    });
}

init().catch(console.error);
