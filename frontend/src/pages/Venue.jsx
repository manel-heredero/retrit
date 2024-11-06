import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import VenuePage from '../components/VenuePage';

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        console.log('Attempting to fetch venue with ID:', id);
        
        // Make sure we have a valid ID
        if (!id) {
          throw new Error('No venue ID provided');
        }

        // Use VenueID instead of MongoDB _id
        const response = await axios.get(`/api/venues/byVenueId/${id}`);
        console.log('API Response:', response.data);
        
        if (response.data.success && response.data.data) {
          setVenue(response.data.data);
        } else {
          throw new Error('Venue not found');
        }
      } catch (err) {
        console.error('Error fetching venue:', err);
        setError(err.message || 'Failed to fetch venue data');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <VStack spacing={4} mt={10}>
        <Spinner size="xl" />
        <Text>Loading venue {id}...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack spacing={4} mt={10}>
        <Text color="red.500" fontWeight="bold">Error</Text>
        <Text>{error}</Text>
      </VStack>
    );
  }

  if (!venue) {
    return (
      <VStack spacing={4} mt={10}>
        <Text fontWeight="bold">Not Found</Text>
        <Text>Venue {id} not found</Text>
      </VStack>
    );
  }

  return <VenuePage venue={venue} />;
}

export default Venue;
