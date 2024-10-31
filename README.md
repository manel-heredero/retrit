# Venue Management Application

## Backend Technology Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Runtime**: Node.js

### Project Structure

```
backend/
├── server.js          # Main application entry point
├── config/
│   └── db.js         # Database configuration
├── routes/
│   └── venue.routes.js # API route definitions
├── controllers/
│   └── venue.controller.js # Route handlers
├── models/
│   └── venue.model.js # Database schemas
└── .env              # Environment variables
```

## Frontend Technology Stack

- **Framework**: React.js
- **UI Library**: Chakra UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Project Structure

```
frontend/
├── src/
│   ├── components/   # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── VenueCard.jsx
│   │   └── VenueFilters.jsx
│   ├── pages/       # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── SubmitVenue.jsx
│   ├── utils/       # Utility functions
│   │   └── galleryHelpers.jsx
│   ├── data/        # Static data files
│   ├── App.jsx      # Main application component
│   └── main.jsx     # Application entry point
└── package.json
```

### Available Routes

- `/` - Home page with venue gallery
- `/about` - About page
- `/blog` - Blog page
- `/submit-venue` - Venue submission form
- `/venue/:id` - Individual venue page

### Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173` by default.

## API Endpoints

### Venues

- `GET /api/venues` - Get all venues (includes pagination)

  - Query params:
    - page (default: 1)
    - limit (default: 6)
  - Response includes:
    - success: boolean
    - currentPage: number
    - totalPages: number
    - totalVenues: number
    - venuesPerPage: number
    - data: array of venues

- `POST /api/venues` - Create a new venue
  Required fields in request body:
  - VenueID: number
  - venueName: string
  - countryCode: string
  - locationType: string
  - proximityToNature: string
  - capacity: string

## Data Validation

- URLs must start with http:// or https://
- Ratings must be between 1 and 5
- Country codes must be valid ISO 3166 three-letter codes

## Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` by default.
