import mongoose from 'mongoose';

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
    
    // Venue type fields
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
        default: null
    },
    description: {
        type: String,
        default: null,
        trim: true
    },
    
    // Geographic fields
    countryName: { type: String, default: null },
    region: { type: String, default: null },
    subRegion: { type: String, default: null },

    // Ratings
    overallRating: { type: Number, default: null },
    commonSpacesRating: { type: Number, default: null },
    foodRating: { type: Number, default: null },
    sleepingComfortRating: { type: Number, default: null },

    // Review status
    reviewed: { type: Boolean, default: false },

    // Additional features
    veggieFriendly: { type: Boolean, default: null },
    canCookSelf: { type: Boolean, default: null },
    image: { type: String, default: null },
    googleMapsLink: { type: String, default: null }
}, {
    collection: 'venues',
    timestamps: true
});

// Keep only the reviewed field calculation middleware
venueSchema.pre('save', function(next) {
    this.reviewed = Boolean(
        this.overallRating ||
        this.commonSpacesRating ||
        this.foodRating ||
        this.sleepingComfortRating
    );
    next();
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue;
