import express from 'express';
import {
    createVenue,
    getAllVenues,
    getVenueById,
    getVenueByVenueId,
    updateVenue,
    deleteVenue
} from '../controllers/venue.controller.js';

const router = express.Router();

router.get('/venues/byVenueId/:id', getVenueByVenueId);
router.post('/venues', createVenue);
router.get('/venues', getAllVenues);
router.get('/venues/:id', getVenueById);
router.put('/venues/:id', updateVenue);
router.delete('/venues/:id', deleteVenue);

export default router;
