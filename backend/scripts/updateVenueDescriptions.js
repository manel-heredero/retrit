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

dotenv.config({ path: join(__dirname, '..', '.env') });

async function updateVenueDescriptions() {
    try {
        // Read and parse the CSV file
        const csvFilePath = join(__dirname, 'venueDescriptions.csv');
        const fileContent = readFileSync(csvFilePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ',',
            quote: '"' // Handle quoted descriptions with commas
        });

        // Connect to MongoDB
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Update each venue
        for (const record of records) {
            const venueId = parseInt(record.VenueID);
            const description = record.Description;

            const result = await Venue.findOneAndUpdate(
                { VenueID: venueId },
                { $set: { description: description } },
                { new: true }
            );

            if (result) {
                console.log(`Updated venue ${venueId} with new description`);
            } else {
                console.log(`Warning: Venue ${venueId} not found in database`);
            }
        }

        console.log('All venue descriptions updated successfully');
    } catch (error) {
        console.error('Error updating venues:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

updateVenueDescriptions();