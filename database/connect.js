const { MongoClient } = require("mongodb");

const url = process.env.DATABASE_URL;

let cachedDB;

const MongoDBConnect = async () => {
    if(cachedDB){
        console.log("MongoDB: Existing cached connection found!");
        const db = cachedDB;
        return db;
    } else {
        console.log("MongoDB: Connecting MongoDB...");
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db("example");
        cachedDB = db;
        return db;
    }
}
module.exports = MongoDBConnect;