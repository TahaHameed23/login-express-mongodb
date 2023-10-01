import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.api_key;

const client = new MongoClient(uri);

const database = client.db("loginCred");
const coll = database.collection("Cred"); 

async function run() {
  try {
    await client.connect();
    console.log('Done');
  } finally {
  }
}

run().catch(console.dir);

export { coll };

