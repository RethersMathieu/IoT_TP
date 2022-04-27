function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases in Mongo Cluster : \n");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

module.exports = { listDatabases };
