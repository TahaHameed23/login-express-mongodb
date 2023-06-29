const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://TahaHameed:ZSXytA3Z4mE7ycaa@cluster0.4zixvyq.mongodb.net/';

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

