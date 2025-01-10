import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Venue from '../models/venue.model.js';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv to look in the correct location
dotenv.config({ path: join(__dirname, '..', '.env') });

// Check if MongoDB URI exists - using MONGO_URI instead of MONGODB_URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

async function updateVenueImages() {
    try {
        // Connect to MongoDB using MONGO_URI
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');

        // Read and parse the CSV file
        const csvFilePath = join(__dirname, 'imagesforvenues.csv');
        const fileContent = readFileSync(csvFilePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });

        // Update each venue
        for (const record of records) {
            const venueId = parseInt(record.VenueID);
            const imageUrl = record['Image URL'];

            const result = await Venue.findOneAndUpdate(
                { VenueID: venueId },
                { image: imageUrl },
                { new: true }
            );

            if (result) {
                console.log(`Updated venue ${venueId} with image URL: ${imageUrl}`);
            } else {
                console.log(`Warning: Venue ${venueId} not found in database`);
            }
        }

        console.log('All venues updated successfully');
    } catch (error) {
        console.error('Error updating venues:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

updateVenueImages();