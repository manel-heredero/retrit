// src/components/VenueFormOther.jsx

import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';

function VenueFormOther({ venueData, onInputChange, onSubmit, onBack }) {
  const handleBack = () => {
    onBack(2); // Go back to step 2
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box bg="gray.100" p={4} borderRadius="md">
        <Text>{venueData.venueName}</Text>
      </Box>

      <FormControl>
        <FormLabel htmlFor="image">Upload Image</FormLabel>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="googleMapsLink">Google Maps Link</FormLabel>
        <Input 
          id="googleMapsLink" 
          placeholder="Enter Google Maps link" 
          value={venueData.googleMapsLink}
          onChange={onInputChange}
        />
      </FormControl>

      <Flex justifyContent="space-between" mt={4}>
        <Button 
          onClick={handleBack}
          colorScheme="brand"
          bg="brand.blue"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Back
        </Button>
        <Button 
          onClick={onSubmit}
          colorScheme="brand"
          bg="brand.orange"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Submit
        </Button>
      </Flex>
    </VStack>
  );
}

export default VenueFormOther;
