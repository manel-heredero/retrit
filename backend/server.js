// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import venueRoutes from './routes/venue.routes.js';
import articleRoutes from './routes/article.routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import logger from './config/logger.js';
import compression from 'compression';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: process.env.NODE_ENV === 'production' 
      ? '.env.production'
      : '.env.development'
});

const app = express();

// Serve static files from the "data" directory
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/uploads', express.static(path.join(__dirname, 'data/uploads')));

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https:", "data:", "https://i.postimg.cc"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https:", "data:"],
            connectSrc: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(mongoSanitize());

// Compression middleware
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6 // Default compression level
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/blog', articleRoutes);
app.use('/api', venueRoutes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
    logger.warn('404 - Route not found:', req.originalUrl);
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling
app.use((err, req, res, next) => {
    logger.error('Error:', { error: err.message, stack: err.stack });
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const startServer = async () => {
    try {
        await connectDB();
        
        // Log database connection
        logger.info('Connected to MongoDB');
        
        // Log all registered routes
        logger.info('\nRegistered Routes:');
        app._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                logger.info(`${Object.keys(r.route.methods)} ${r.route.path}`);
            }
        });
        
        app.listen(PORT, HOST, () => {
            const baseUrl = process.env.NODE_ENV === 'production'
                ? process.env.API_URL || `https://${process.env.APP_NAME}.herokuapp.com`
                : `http://${HOST}:${PORT}`;
        
            logger.info(`\nServer running on ${baseUrl}`);
            logger.info(`Test the server: ${baseUrl}/test`);
            logger.info(`Articles endpoint: ${baseUrl}/api/blog`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();