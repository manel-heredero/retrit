import express from 'express';
import { uploadImage } from '../controllers/image.controller.js';

const router = express.Router();

// POST /api/images/upload
router.post('/upload', uploadImage);

export default router;
