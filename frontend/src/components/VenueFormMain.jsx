// src/components/VenueFormMain.jsx

import React, { useState } from 'react';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react';
import countriesData from '../data/countries.json';
import venueOptions from '../data/venueOptions.json';

function VenueFormMain({ venueData, onInputChange, onNext }) {
  const { capacityOptions, locationTypes, relationToVenue } = venueOptions;
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!venueData.venueName) newErrors.venueName = "Venue name is required";
    if (!venueData.country) newErrors.country = "Country is required";
    if (!venueData.capacity) newErrors.capacity = "Capacity is required";
    if (!venueData.venueType) newErrors.venueType = "Venue type is required";
    if (!venueData.relationToVenue) newErrors.relationToVenue = "Relation to venue is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        <FormControl isRequired isInvalid={!!errors.venueName}>
          <FormLabel htmlFor="venueName">Venue Name</FormLabel>
          <Input 
            id="venueName" 
            placeholder="Enter venue name" 
            value={venueData.venueName}
            onChange={onInputChange}
          />
          {errors.venueName && <Text color="red.500" fontSize="sm">{errors.venueName}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.country}>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Select 
            id="country" 
            placeholder="Select country"
            value={venueData.country}
            onChange={onInputChange}
          >
            {countriesData.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </Select>
          {errors.country && <Text color="red.500" fontSize="sm">{errors.country}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.capacity}>
          <FormLabel htmlFor="capacity">Capacity</FormLabel>
          <Select 
            id="capacity" 
            placeholder="Select capacity"
            value={venueData.capacity}
            onChange={onInputChange}
          >
            {capacityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.capacity && <Text color="red.500" fontSize="sm">{errors.capacity}</Text>}
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.venueType}>
          <FormLabel htmlFor="venueType">Venue Type</FormLabel>
          <Select 
            id="venueType" 
            placeholder="Select venue type"
            value={venueData.venueType}
            onChange={onInputChange}
          >
            {locationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {errors.venueType && <Text color="red.500" fontSize="sm">{errors.venueType}</Text>}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="venueWebsite">Venue Website</FormLabel>
          <Input 
            id="venueWebsite" 
            placeholder="Enter venue website" 
            value={venueData.venueWebsite}
            onChange={onInputChange}
          />
        </FormControl>
        
        <FormControl isRequired isInvalid={!!errors.relationToVenue}>
          <FormLabel htmlFor="relationToVenue">Relation to Venue</FormLabel>
          <Select 
            id="relationToVenue" 
            placeholder="Select your relation to the venue"
            value={venueData.relationToVenue}
            onChange={onInputChange}
          >
            {relationToVenue.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          {errors.relationToVenue && <Text color="red.500" fontSize="sm">{errors.relationToVenue}</Text>}
        </FormControl>
      </SimpleGrid>
      <Box display="flex" justifyContent="flex-end">
        <Button 
          onClick={handleNext}
          mt={4}
          colorScheme="brand"
          bg="brand.orange"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Next
        </Button>
      </Box>
    </VStack>
  );
}

export default VenueFormMain;
