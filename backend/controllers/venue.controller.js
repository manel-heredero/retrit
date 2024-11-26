import Venue from '../models/venue.model.js';

// Get all venues
export const getAllVenues = async (req, res) => {
    try {
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

// Get single venue by ID
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
        const venue = await Venue.findOne({ VenueID: req.params.id });

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

export default {
    getAllVenues,
    getVenueById,
    getVenueByVenueId
};
