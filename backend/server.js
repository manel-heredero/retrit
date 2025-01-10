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
    credentials: true
}));

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
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/blog', articleRoutes); // Move this before venueRoutes
app.use('/api', venueRoutes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
    console.log('404 - Route not found:', req.originalUrl);
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        
        // Log database connection
        console.log('Connected to MongoDB');
        
        // Log all registered routes
        console.log('\nRegistered Routes:');
        app._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
            }
        });
        
        app.listen(PORT, () => {
            console.log(`\nServer running on http://localhost:${PORT}`);
            console.log(`Test the server: http://localhost:${PORT}/test`);
            console.log(`Articles endpoint: http://localhost:${PORT}/api/blog`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
