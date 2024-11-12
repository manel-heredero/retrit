import venueOptions from '../data/venueOptions.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const transformVenueData = (venueData) => {
    // Get the default proximity option or use the first one from the list
    const defaultProximity = venueData.proximityToNature || venueOptions.proximityToNatureOptions[0];
    
    // Validate that the proximity value is valid
    const validProximity = venueOptions.proximityToNatureOptions.includes(defaultProximity)
        ? defaultProximity
        : venueOptions.proximityToNatureOptions[0];

    return {
        venueName: venueData.venueName,
        countryCode: venueData.country,
        locationType: venueData.venueType,
        proximityToNature: validProximity,
        capacity: venueData.capacity,
        // Optional fields
        venueWebsite: venueData.venueWebsite || null,
        veggieFriendly: venueData.veggieVeganFriendly || false,
        canCookSelf: venueData.canCookYourself || false,
        // Ratings
        overallRating: Number(venueData.overallRating) || null,
        commonSpacesRating: Number(venueData.commonSpaces) || null,
        foodRating: Number(venueData.food) || null,
        sleepingComfortRating: Number(venueData.sleepingComfort) || null,
        // Other
        googleMapsLink: venueData.googleMapsLink || null,
        imageUrl: venueData.imageUrl || null,
    };
};

export const submitVenueData = async (venueData) => {
    try {
        const submitData = transformVenueData(venueData);
        
        const response = await fetch(`${API_URL}/api/venues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit venue');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting venue:', error);
        throw error;
    }
};

export const getVenues = async () => {
    try {
        const response = await fetch(`${API_URL}/api/venues`);
        if (!response.ok) throw new Error('Failed to fetch venues');
        return await response.json();
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
    }
};
