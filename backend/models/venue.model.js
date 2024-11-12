import mongoose from 'mongoose';

/*Some fields of the schema are defined in a JSON file (the fields that have a dropdown menu).  
The /frontend/src/data/venueOptions.json file contains the options for the dropdown menus. 
To go to the frontend side of the project, we need to get out of the backend folder...*/

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read options from JSON file directly with the function readFileSync, thus not needing to import the venueOptions.json    
const venueOptions = JSON.parse(
    fs.readFileSync(
        join(__dirname, '../../frontend/src/data/venueOptions.json'),
        'utf-8'
    )
);

// Here below the schema is defined for all fields

const venueSchema = new mongoose.Schema({
    // Required fields
    VenueID: {
        type: Number,
        required: [true, 'Venue ID is required'],
        unique: true
    },
    venueName: {
        type: String,
        required: [true, 'Venue name is required'],
        trim: true
    },
    countryCode: {
        type: String,
        required: [true, 'Country code is required'],
        uppercase: true,
        trim: true
    },
    
    // Required fields with dropdowns (no need for enum validation)
    locationType: {
        type: String,
        required: [true, 'Location type is required']
    },
    proximityToNature: {
        type: String,
        required: [true, 'Proximity to nature is required']
    },
    capacity: {
        type: String,
        required: [true, 'Capacity is required']
    },

    // Optional fields
    venueWebsite: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^https?:\/\/.+/.test(v);
            },
            message: 'If provided, website URL must start with http:// or https://'
        },
        default: null
    },

    description: {
        type: String,
        default: null,
        trim: true
    },
    
    // Geographic fields (auto-populated)
    countryName: { type: String, default: null },
    region: { type: String, default: null },
    subRegion: { type: String, default: null },

    // Optional ratings
    overallRating: { type: Number, default: null },
    commonSpacesRating: { type: Number, default: null },
    foodRating: { type: Number, default: null },
    sleepingComfortRating: { type: Number, default: null },

    // Boolean field to check if the venue has been reviewed (auto-populated)
    reviewed: { type: Boolean, default: false },

    // Other optional fields
    veggieFriendly: { type: Boolean, default: null },
    canCookSelf: { type: Boolean, default: null },
    image: { type: mongoose.Schema.Types.Mixed, default: null },

    googleMapsLink: {
        type: String,
        validate: {
            validator: function(v) {
                if (!v) return true;  // Allow empty/null
                return /^https?:\/\/.+/.test(v);
            },
            message: 'If provided, Google Maps link must start with http:// or https://'
        },  
        default: null
    }
}, {
    collection: 'venues',
    timestamps: true
});

// Middleware to auto-populate the reviewed field
venueSchema.pre('save', function(next) {
    // A venue is considered reviewed if it has any rating
    this.reviewed = Boolean(
        this.overallRating ||
        this.commonSpacesRating ||
        this.foodRating ||
        this.sleepingComfortRating
    );
    next();
});

// Middleware to auto-populate the reviewed field when updating the venue
venueSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    const hasRating = Boolean(
        update.overallRating ||
        update.commonSpacesRating ||
        update.foodRating ||
        update.sleepingComfortRating
    );
    
    // Set the reviewed field based on ratings
    this.set({ reviewed: hasRating });
    next();
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue;
