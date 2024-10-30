// src/components/VenueFormThanks.jsx

import React from 'react';
import {
  Button,
  VStack,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function VenueFormThanks({ venueName }) {
  const navigate = useNavigate();

  const handleGoToGallery = () => {
    navigate('/'); // Assuming the gallery is on the home page
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box bg="gray.100" p={6} borderRadius="md" textAlign="center">
        <Heading as="h2" size="xl" mb={4}>
          Thank You!
        </Heading>
        <Text fontSize="lg">
          Your submission for <strong>{venueName}</strong> has been received.
        </Text>
        <Text fontSize="lg" mt={2}>
          We appreciate your contribution to our venue database.
        </Text>
      </Box>

      <Button 
        onClick={handleGoToGallery}
        colorScheme="brand"
        bg="brand.blue"
        color="brand.seasalt"
        _hover={{ bg: 'brand.verdigris' }}
        size="lg"
        width="full"
      >
        Take Me to Gallery
      </Button>
    </VStack>
  );
}

export default VenueFormThanks;
