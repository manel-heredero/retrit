import Venue from '../models/venue.model.js';

// Create new venue
export const createVenue = async (req, res) => {
    try {
        const venue = new Venue(req.body);
        await venue.save();
        
        res.status(201).json({
            success: true,
            data: venue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all venues. Pagination will be done in the frontend.
export const getAllVenues = async (req, res) => {
    try {
        // Simply get all venues, sorted by VenueID
        const venues = await Venue.find({})
            .sort({ VenueID: 1 })
            .lean();
        
        res.json({
            success: true,
            count: venues.length,
            data: venues
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single venue
export const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.json({
            success: true,
            data: venue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single venue by VenueID
export const getVenueByVenueId = async (req, res) => {
    try {
        console.log('Looking up venue with VenueID:', req.params.id);
        
        const venue = await Venue.findOne({ VenueID: req.params.id });
        console.log('Found venue:', venue ? 'yes' : 'no');

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.json({
            success: true,
            data: venue
        });
    } catch (error) {
        console.error('Error in getVenueByVenueId:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update venue
export const updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.json({
            success: true,
            data: venue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete venue
export const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);

        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }

        res.json({
            success: true,
            message: 'Venue deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
