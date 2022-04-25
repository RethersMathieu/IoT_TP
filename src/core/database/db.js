const { listDatabases } = require("./function");
require('../../env/env');

const name = process.env.DATABASE_NAME;
const nameCollectionTemp = "temp";
const nameCollectionLight = "light";

async function initDBO() {
  const client = await require('./client');
  let dbo;
  client.connect(function (err, mg_client) {
    if (err) { throw err; } else if (mg_client === undefined) return;

    listDatabases(mg_client);
    dbo = mg_client.db(name);
    dbo
      .listCollections({ name: nameCollectionTemp })
      .next(function (err, collinfo) {
        if (collinfo) dbo.collection(nameCollectionTemp).drop();
      });
    dbo
      .listCollections({ name: nameCollectionLight })
      .next(function (err, collinfo) {
        if (collinfo) dbo.collection(nameCollectionLight).drop();
      });

    process.on("exit", () => client.close());
  });
  return dbo;
}
module.exports = initDBO();

