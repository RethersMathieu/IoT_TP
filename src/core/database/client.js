const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://ESP_NodeJS_IoT:Rm5YjSvPzMJz32gV@iot-tp.7vrbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function initClient() {
    try {
        return await MongoClient.connect(URI);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = initClient();