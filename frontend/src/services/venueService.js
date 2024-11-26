import venueOptions from '../data/venueOptions.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const transformVenueData = (venueData) => {
    console.log('Original venue data:', venueData);
    console.log('Image URL before transform:', venueData.image);
    
    // First, extract the fields we want to transform
    const {
        image,
        country,
        venueType,
        veggieVeganFriendly,
        canCookYourself,
        commonSpaces,
        food,
        sleepingComfort,
        proximityToNature,
        ...rest
    } = venueData;

    const transformedData = {
        ...rest,  // Include remaining fields
        countryCode: country,
        locationType: venueType,
        veggieFriendly: veggieVeganFriendly || false,
        canCookSelf: canCookYourself || false,
        commonSpacesRating: Number(commonSpaces) || null,
        foodRating: Number(food) || null,
        sleepingComfortRating: Number(sleepingComfort) || null,
        image: image || null,  // Set image field from imageUrl
        proximityToNature: proximityToNature || venueOptions.proximityToNatureOptions[0]
    };

    console.log('Final transformed data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
};

export const submitVenueData = async (venueData) => {
    try {
        const submitData = transformVenueData(venueData);
        
        console.log('Sending to backend:', JSON.stringify(submitData, null, 2));
        
        const response = await fetch(`${API_URL}/api/venues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });

        const result = await response.json();
        console.log('Raw backend response:', JSON.stringify(result, null, 2));

        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit venue');
        }

        return result;
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
