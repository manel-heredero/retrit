import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Connect with mongoose
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongoose connected');

        // Also connect with MongoClient to verify
        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db('venues');
        const collection = db.collection('venues');
        
        // Get count
        const count = await collection.countDocuments();
        console.log(`Found ${count} venues in database`);

        // Get first document
        const firstVenue = await collection.findOne({});
        if (firstVenue) {
            console.log('Sample venue:', firstVenue.venueName);
        }

        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
