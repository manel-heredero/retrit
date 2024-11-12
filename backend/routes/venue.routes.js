import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    createVenue,
    getAllVenues,
    getVenueById,
    getVenueByVenueId,
    updateVenue,
    deleteVenue
} from '../controllers/venue.controller.js';

const router = express.Router();

// Configure multer for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../data/uploads/venues'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Middleware to handle file upload and add image path to request body
const handleFileUpload = (req, res, next) => {
    upload.single('image')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: 'File upload error',
                error: err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        
        // Add image path to request body if file was uploaded
        if (req.file) {
            req.body.image = `/uploads/venues/${req.file.filename}`;
        }
        next();
    });
};

// Routes
router.get('/venues/byVenueId/:id', getVenueByVenueId);
router.post('/venues', express.json(), createVenue);
router.get('/venues', getAllVenues);
router.get('/venues/:id', getVenueById);
router.put('/venues/:id', handleFileUpload, updateVenue);
router.delete('/venues/:id', deleteVenue);

export default router;
