// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import venueRoutes from './routes/venue.routes.js';
import articleRoutes from './routes/article.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
  }));

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
            console.log('Test the server: http://localhost:${PORT}/test');
            console.log('Articles endpoint: http://localhost:${PORT}/api/blog');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
