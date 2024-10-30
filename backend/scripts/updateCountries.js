// scripts/updateCountries.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const updateVenues = async () => {
    try {
        // Updated path to match your file structure
        const countriesPath = join(__dirname, './data/countries.json');
        console.log('Reading countries from:', countriesPath);
        
        const countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf-8'));
        
        // Convert array to lookup object
        const countryMap = {};
        countriesData.forEach(country => {
            countryMap[country.code] = {
                name: country.name,
                region: country.region,
                subRegion: country.subRegion
            };
        });

        console.log('Loaded country data for', Object.keys(countryMap).length, 'countries');

        // Connect to MongoDB
        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db('venues');
        const collection = db.collection('venues');

        // Get all venues
        const venues = await collection.find({}).toArray();
        console.log(`Found ${venues.length} venues to update`);

        // Track updates
        let updatedCount = 0;
        let skippedCount = 0;
        let noCountryInfoCount = 0;

        // Update each venue
        for (const venue of venues) {
            const countryInfo = countryMap[venue.countryCode];
            
            if (countryInfo) {
                const updateResult = await collection.updateOne(
                    { _id: venue._id },
                    { 
                        $set: {
                            countryName: countryInfo.name,
                            region: countryInfo.region,
                            subRegion: countryInfo.subRegion
                        }
                    }
                );

                if (updateResult.modifiedCount > 0) {
                    updatedCount++;
                    console.log(`Updated ${venue.venueName} (${venue.countryCode}):`, {
                        countryName: countryInfo.name,
                        region: countryInfo.region,
                        subRegion: countryInfo.subRegion
                    });
                } else {
                    skippedCount++;
                    console.log(`Skipped ${venue.venueName} (no changes needed)`);
                }
            } else {
                noCountryInfoCount++;
                console.log(`Warning: No country info found for code ${venue.countryCode} (${venue.venueName})`);
            }
        }

        console.log('\nUpdate Summary:');
        console.log(`Total venues: ${venues.length}`);
        console.log(`Updated: ${updatedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        console.log(`Missing country info: ${noCountryInfoCount}`);

        await client.close();
        console.log('\nDatabase connection closed');

    } catch (error) {
        console.error('Error updating venues:', error);
        console.error('Error details:', error.stack);
    }
};

// Run the update
updateVenues();
