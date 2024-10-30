// frontend/src/utils/venueFormHelpers.js

// Import any necessary dependencies, e.g., axios for making HTTP requests
import axios from 'axios';

/**
 * Submits the venue data to the backend
 * @param {Object} venueData - The venue data to be submitted
 * @returns {Promise} A promise that resolves with the newly created venue data
 */
export const handleSubmit = async (venueData) => {
  try {
    const response = await axios.post('/api/venues', venueData);
    
    if (response.status !== 201) {
      throw new Error('Failed to submit venue');
    }

    return response.data; // This should be the newly created venue, including its ID
  } catch (error) {
    console.error('Error submitting venue:', error);
    throw error; // Re-throw the error so it can be handled by the component
  }
};

/**
 * Validates the venue data before submission
 * @param {Object} venueData - The venue data to be validated
 * @returns {Object} An object with isValid boolean and any error messages
 */
export const validateVenueData = (venueData) => {
  const errors = {};

  if (!venueData.venueName.trim()) {
    errors.venueName = 'Venue name is required';
  }

  if (!venueData.country) {
    errors.country = 'Country is required';
  }

  if (!venueData.capacity) {
    errors.capacity = 'Capacity is required';
  }

  if (!venueData.venueType) {
    errors.venueType = 'Venue type is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// You can add more helper functions here as needed

