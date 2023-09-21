const { MongoClient } = require("mongodb");
const dotenv = require("dotenv")
dotenv.config();

const uri = process.env.api_key;

const client = new MongoClient(uri);

const database = client.db("loginCred");
const coll = database.collection("Cred"); 

async function run() {
  try {
    await client.connect();
  } finally {
    console.log('Done');
  }
}

run().catch(console.dir);

module.exports = 
  {coll,}; // Export the collection object

