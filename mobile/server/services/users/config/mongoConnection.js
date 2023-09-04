const { MongoClient } = require("mongodb");
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const client = new MongoClient(MONGO_DB_URL);
let db;

async function mongoConnection() {
  try {
    await client.connect();
    console.log("connected to server");
    db = client.db("japaneseShelter_CMS");
    return db;
  } catch (err) {
    await client.close();
  }
}

function getDB() {
  return db;
}

module.exports = {
  mongoConnection,
  db,
  getDB,
};
