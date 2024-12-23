import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const uri = process.env.ATLAS_URL || '';

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (!cachedDb) {
    try {
      await client.connect();
      cachedDb = client.db("Kompass"); // Optionally pass a database name here, e.g., client.db('yourDatabaseName')
      console.log('Connected to database');
    } catch (err) {
      console.error('Failed to connect to database', err);
      throw err;
    }
  }
  return cachedDb;
}
