# Deployment Guide

## Prerequisites

- Node.js >=16.20.1
- MongoDB Atlas account with production database
- Production environment variables configured

## Environment Files

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables
- `.env.template` - Template for required variables

## Required Environment Variables

- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment setting (development/production)
- `FRONTEND_URL` - Frontend application URL

## Deployment Steps

1. Clone the production branch

   ```bash
   git clone -b production https://github.com/manel-heredero/retrit.git
   cd retrit/backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.template .env.production
   # Edit .env.production with actual values
   ```

4. Start the server
   ```bash
   NODE_ENV=production npm start
   ```

## Health Check

- Endpoint: `/api/health`
- Expected response:
  ```json
  {
    "status": "ok",
    "environment": "production",
    "timestamp": "2024-XX-XX...",
    "mongodb": "connected"
  }
  ```

## Monitoring

- Check server logs for any errors
- Monitor MongoDB connection status
- Verify CORS settings with frontend URL
