import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { Box, Spinner } from '@chakra-ui/react';
import VenuePage from './VenuePage'; // Adjust the import path as necessary

function Venue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`/api/venues/${id}`);
        setVenue(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch venue data');
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
  if (error) return <Box textAlign="center" mt={10} color="red.500">{error}</Box>;
  if (!venue) return <Box textAlign="center" mt={10}>Venue not found</Box>;

  return <VenuePage venue={venue} />;
}

export default Venue;
