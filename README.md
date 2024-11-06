# Venue Management Application

Project Brief at /instructions.md

## Backend Technology Stack

- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Runtime**: Node.js

### Project Structure

```
backend/
├── server.js          # Main application entry point
├── config/
│   └── db.js         # Database configuration with MongoDB Atlas
├── routes/
│   └── venue.routes.js # API route definitions
├── controllers/
│   └── venue.controller.js # Route handlers with error logging
├── models/
│   └── venue.model.js # Database schemas with auto-population
└── .env              # Environment variables
```

## Frontend Technology Stack

- **Framework**: React.js with Vite
- **UI Library**: Chakra UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks

### Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/   # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── VenueCard.jsx
│   │   ├── Gallery.jsx
│   │   ├── StarRating.jsx
│   │   ├── VenueFormMain.jsx
│   │   ├── VenueFormOther.jsx
│   │   ├── VenueFormReview.jsx
│   │   ├── VenueFormThanks.jsx
│   │   ├── VenuePage.jsx
│   │   └── VenueFilters.jsx
│   ├── pages/       # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── SubmitVenue.jsx
│   │   └── Venue.jsx
│   ├── utils/       # Utility functions
│   │   └── galleryHelpers.js
│   │   └── venueFormHelpers.js
│   ├── data/        # Static data files
│   │   ├── countries.json
│   │   └── venueOptions.json
│   ├── App.jsx      # Main application component
│   └── main.jsx     # Application entry point
│   └── theme.js     # Chakra UI theme configuration
    ├── data/
│   │   ├── countries.json
│   └── └── venueOptions.json
└── package.json
└── index.html
└── package-lock.json
└── README.md
```

### Features

- Responsive venue gallery with filtering
- Three-tier filtering system:
  1. Region filter
  2. Capacity filter
  3. Location type filter
- Reviewed venues displayed first
- Pagination (6 venues per page)
- Auto-population of review status

### Available Routes

- `/` - Home page with venue gallery and filters
- `/about` - About page
- `/blog` - Blog page
- `/submit-venue` - Venue submission form
- `/venue/:id` - Individual venue page

## API Endpoints

### Venues

- `GET /api/venues` - Get all venues

  - Response includes:
    - success: boolean
    - count: number
    - data: array of venues

- `POST /api/venues` - Create a new venue
- `GET /api/venues/:id` - Get a specific venue
- `PUT /api/venues/:id` - Update a venue
- `DELETE /api/venues/:id` - Delete a venue

## Data Validation

- URLs must start with http:// or https://
- Ratings must be between 1 and 5
- Country codes must be valid ISO 3166 three-letter codes
- Review status is auto-populated based on ratings

## Setup Instructions

### Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file:

   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

Access the application at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
