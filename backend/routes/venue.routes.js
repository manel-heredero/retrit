import express from 'express';
import {
    getAllVenues,
    getVenueById,
    getVenueByVenueId
} from '../controllers/venue.controller.js';

const router = express.Router();

// Routes - Keep only GET endpoints
router.get('/venues/byVenueId/:id', getVenueByVenueId);
router.get('/venues', getAllVenues);
router.get('/venues/:id', getVenueById);

export default router;
