import fetch from 'node-fetch';

const testVenue = {
    venueName: "Test Venue",
    countryCode: "ES",
    locationType: "Remote",
    proximityToNature: "Very much in nature",
    capacity: "Up to 7 people"
};

async function testCreateVenue() {
    try {
        console.log('Sending test venue data:', testVenue);
        
        const response = await fetch('http://localhost:5000/api/venues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testVenue)
        });

        const data = await response.json();
        console.log('Response:', data);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error testing venue creation:', error);
    }
}

// Run the test
testCreateVenue();
