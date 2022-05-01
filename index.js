const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');
const config = require("./src/env/env");

function isJSON(str) {
    let obj;
    try { obj = JSON.parse(str); }
    catch (err) { return undefined; }
    return obj;
}

async function authorizeMQTT(dbo, mac) {
    return dbo.collection('user').findOne({ mac });
}

async function initMongo() {
    return require("./src/core/database/db");
}

async function initMQTT(dbo) {
    const mqtt_client = require("./src/core/mqtt/client");

    mqtt_client.on("connect", function () {
        mqtt_client.subscribe('iot/M1Miage2022', function (err) {
            if (err) throw new Error(`ERROR SUBSCRIBE TOPIC: ${TOPIC_TEMP}.`);
        });
    });

    mqtt_client.on("message", async function (topic, message) {
        console.log("\nMQTT message on TOPIC:", topic.toString());
        console.log("Message payload", message.toString());
        let msg;
        const key = path.parse(topic.toString()).base;

        if (!(msg = isJSON(message.toString()))) {
            console.error('Message refused');
            return;
        }
        const { status, info } = msg;
        if (!(status && info && info.ident && !lodash.isNil(status.temperature) && !lodash.isNil(status.light))) {
            console.error('Message refused 1');
            return;
        }
        else if (!(await authorizeMQTT(dbo, info.ident))) {
            console.error('Message non authorisé.');
            return;
        }

        const whoList = [];
        if (!whoList.find(msg => msg.ident.who === info.ident)) whoList.push(msg);
        console.log("wholist using the node server :", JSON.stringify(whoList));
        const date = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Paris" });
        const { ident } = info;
        const { temperature, light } = status;

        const new_entry = { date, who: ident, temperature, light };
        dbo.collection(key).insertOne(new_entry, function (err, res) {
            if (err) return err;
            console.log('\nItem:', `${JSON.stringify(new_entry)}`, '\ninserted in db in collection:', key);
        });
    });
    return mqtt_client;
}

async function init() {
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