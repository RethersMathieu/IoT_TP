const { MongoClient } = require('mongodb');
require("../../env/env");

const URI = process.env.DATABASE_URI || '';
const name = process.env.DATABASE_NAME;

async function initClient() {
    return await MongoClient.connect(URI);
}

module.exports = initClient();