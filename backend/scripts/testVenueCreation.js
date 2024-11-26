import mongoose from 'mongoose';
import Venue from '../models/venue.model.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retrit';

const testVenue = {
    VenueID: 999,  // Test ID
    venueName: "Test Venue With Image",
    countryCode: "ESP",
    locationType: "Remote",
    proximityToNature: "Very much in nature",
    capacity: "Between 15 and 30 people",
    // Optional fields
    venueWebsite: "https://test-venue.com",
    veggieFriendly: true,
    canCookSelf: true,
    // Test image URL
    image: "https://i.ibb.co/Zzmy93R/73bd6436a6f3.png",
    googleMapsLink: "https://maps.google.com/test"
};

async function testVenueCreation() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB at:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create venue
        console.log('Creating venue with data:', JSON.stringify(testVenue, null, 2));
        const venue = new Venue(testVenue);
        
        // Log before save
        console.log('Venue object before save:', venue);
        console.log('Image field before save:', venue.image);

        // Save venue
        const savedVenue = await venue.save();
        
        // Log after save
        console.log('Saved venue:', JSON.stringify(savedVenue.toObject(), null, 2));
        console.log('Image field after save:', savedVenue.image);

    } catch (error) {
        console.error('Error:', error);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`Validation error for ${key}:`, error.errors[key].message);
            });
        }
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the test
testVenueCreation();
