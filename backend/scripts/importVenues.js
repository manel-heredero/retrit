import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Venue from '../models/venue.model.js';

// Get the current file's directory and set up paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

// Load environment variables
console.log('Loading environment from:', envPath);
dotenv.config({ path: envPath });

if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not found in environment variables');
    process.exit(1);
}

async function connectToMongo() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

async function importVenues() {
    try {
        await connectToMongo();

        // Read and parse the CSV file
        const csvFilePath = join(__dirname, 'data', '250110_Import.csv');
        console.log('Reading CSV file from:', csvFilePath);
        
        const fileContent = readFileSync(csvFilePath, 'utf-8');
        console.log('CSV file read successfully');

        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ',',
            quote: '"'
        });

        console.log(`Found ${records.length} venues in CSV file`);

        // Process each record
        for (const record of records) {
            try {
                const venueData = {
                    VenueID: parseInt(record.VenueID),
                    venueName: record.venueName?.trim(),
                    countryCode: record.countryCode?.toUpperCase()?.trim(),
                    locationType: record.locationType,
                    proximityToNature: record.proximityToNature,
                    capacity: record.capacity,
                    venueWebsite: record.venueWebsite || null,
                    description: record.Description?.trim() || null,
                    countryName: record.countryName || null,
                    region: record.region || null,
                    subRegion: record.subRegion || null,
                    overallRating: record.overallRating ? parseFloat(record.overallRating) : null,
                    commonSpacesRating: record.commonSpacesRating ? parseFloat(record.commonSpacesRating) : null,
                    foodRating: record.foodRating ? parseFloat(record.foodRating) : null,
                    sleepingComfortRating: record.sleepingComfortRating ? parseFloat(record.sleepingComfortRating) : null,
                    reviewed: record.reviewed === 'TRUE',
                    veggieFriendly: record.veggieFriendly === 'true' ? true : null,
                    canCookSelf: record.canCookSelf === 'true' ? true : null,
                    image: record.image || null,
                    googleMapsLink: record.googleMapsLink || null
                };

                console.log(`Processing venue ${venueData.VenueID}: ${venueData.venueName}`);

                const result = await Venue.findOneAndUpdate(
                    { VenueID: venueData.VenueID },
                    venueData,
                    { upsert: true, new: true }
                );

                console.log(`Successfully imported venue ${venueData.VenueID}`);
            } catch (error) {
                console.error(`Error processing venue ${record.VenueID}:`, error.message);
            }
        }

        console.log('Import completed successfully');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Import failed:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

// Run the import
importVenues().catch(async (error) => {
    console.error('Unhandled error:', error);
    await mongoose.connection.close();
    process.exit(1);
});