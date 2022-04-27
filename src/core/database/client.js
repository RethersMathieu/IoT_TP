const { MongoClient } = require('mongodb');

const URI = process.env.DATABASE_URI;

async function initClient() {
    try {
        return await MongoClient.connect(URI);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = initClient();