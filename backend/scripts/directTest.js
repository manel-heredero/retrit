import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const test = async () => {
    try {
        // Connect using MongoClient directly
        const client = await MongoClient.connect(process.env.MONGO_URI);
        console.log('Connected successfully');

        // List all databases
        const adminDb = client.db('admin');
        const dbs = await adminDb.admin().listDatabases();
        console.log('\nAvailable databases:');
        dbs.databases.forEach(db => console.log(`- ${db.name} (${db.sizeOnDisk} bytes)`));

        // Connect to venues database
        const db = client.db('venues');
        
        // List collections
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in venues database:');
        collections.forEach(coll => console.log(`- ${coll.name}`));

        // Try to query venues
        const venuesCollection = db.collection('venues');
        const count = await venuesCollection.countDocuments();
        console.log('\nVenues count:', count);

        // Get first document
        const firstDoc = await venuesCollection.findOne({});
        console.log('\nFirst document:', firstDoc);

        await client.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

test();
