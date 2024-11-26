import express from 'express';
import {
    getAllVenues,
    getVenueById,
    getVenueByVenueId
} from '../controllers/venue.controller.js';

const router = express.Router();

// Routes - Keep only GET endpoints
router.get('/venues', getAllVenues);
router.get('/venues/:id', getVenueById);
router.get('/venues/byVenueId/:id', getVenueByVenueId);

export default router;
