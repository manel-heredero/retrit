// This script updates the reviewed field for all venues, one use only, supposedly
// It is used to auto-populate the reviewed field that is used to filter venues in the frontend

import mongoose from 'mongoose';
import Venue from '../models/venue.model.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

const updateReviewedField = async () => {
    try {
        // Verify the connection string is loaded
        console.log('MongoDB URI:', process.env.MONGO_URI ? 'Found' : 'Not found');
        
        await connectDB();
        
        const result = await Venue.updateMany(
            {}, // all documents
            [
                {
                    $set: {
                        reviewed: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $ne: ["$overallRating", null] },
                                        { $ne: ["$commonSpacesRating", null] },
                                        { $ne: ["$foodRating", null] },
                                        { $ne: ["$sleepingComfortRating", null] }
                                    ]
                                },
                                then: true,
                                else: false
                            }
                        }
                    }
                }
            ]
        );

        console.log(`Updated ${result.modifiedCount} venues`);
        process.exit(0);
    } catch (error) {
        console.error('Error updating venues:', error);
        process.exit(1);
    }
};

updateReviewedField();