const { MongoClient } = require('mongodb');

console.log(process.env.DATABASE_URI);

const URI = process.env.MONGODB_URI || 'mongodb+srv://ESP_NodeJS_IoT:Rm5YjSvPzMJz32gV@iot-tp.7vrbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

function initClient() {
    console.log('CREATE CONNECTOR');
    return MongoClient(
        process.env.MONGODB_URI || 'mongodb+srv://ESP_NodeJS_IoT:Rm5YjSvPzMJz32gV@iot-tp.7vrbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
}

module.exports = initClient();