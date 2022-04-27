const { MongoClient } = require('mongodb');

console.log(process.env.DATABASE_URI);

const URI = 'mongodb+srv://ESP_NodeJS_IoT:Rm5YjSvPzMJz32gV@iot-tp.7vrbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function initClient() {
    console.log('CREATE CONNECTOR');
    try {
        return await MongoClient.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = initClient();