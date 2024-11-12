// Validation logic
import { isValidUrl } from './urlHelpers';
import { FORM_STEPS } from '../constants/venueFormConstants';
import venueOptions from '../data/venueOptions.json';

export const validateStep = (currentStep, data) => {
    const errors = {};
    
    switch(currentStep) {
        case FORM_STEPS.BASIC_INFO:
            if (!data.venueName?.trim()) errors.venueName = "Venue name is required";
            if (!data.country) errors.country = "Country is required";
            if (!data.capacity) errors.capacity = "Capacity is required";
            if (!data.venueType) errors.venueType = "Venue type is required";
            if (!data.relationToVenue) errors.relationToVenue = "Relation to venue is required";
            if (!data.proximityToNature) {
                errors.proximityToNature = "Proximity to nature is required";
            } else if (!venueOptions.proximityToNatureOptions.includes(data.proximityToNature)) {
                errors.proximityToNature = "Invalid proximity to nature option";
            }
            break;
            
        case FORM_STEPS.RATINGS:
            const ratings = ['food', 'sleepingComfort', 'commonSpaces', 'overallRating'];
            ratings.forEach(rating => {
                if (data[rating] && (data[rating] < 0 || data[rating] > 5)) {
                    errors[rating] = "Rating must be between 0 and 5";
                }
            });
            break;
            
        case FORM_STEPS.ADDITIONAL_INFO:
            if (data.venueWebsite && !isValidUrl(data.venueWebsite)) {
                errors.venueWebsite = "Please enter a valid URL";
            }
            if (data.googleMapsLink && !isValidUrl(data.googleMapsLink)) {
                errors.googleMapsLink = "Please enter a valid Google Maps URL";
            }
            break;
    }
    
    return errors;
};
