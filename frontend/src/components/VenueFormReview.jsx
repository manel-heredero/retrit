// src/components/VenueFormReview.jsx

import React from 'react';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Button,
  VStack,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import StarRating from './StarRating';

function VenueFormReview({ venueData, onInputChange, onNext, onBack }) {
  const selfHostingLevels = ['You do everything', 'Some help from the venue', 'Quite catered', 'They do everything for you'];

  const handleBack = () => {
    onBack(1); // Explicitly tell the parent component to go back to step 1
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box bg="gray.100" p={4} borderRadius="md">
        <Text>{venueData.venueName}</Text>
      </Box>

      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        <FormControl>
          <FormLabel htmlFor="food">Food</FormLabel>
          <StarRating 
            id="food"
            rating={Number(venueData.food)}
            onRatingChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="sleepingComfort">Sleeping Comfort</FormLabel>
          <StarRating 
            id="sleepingComfort"
            rating={Number(venueData.sleepingComfort)}
            onRatingChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="commonSpaces">Quality of Common Spaces</FormLabel>
          <StarRating 
            id="commonSpaces"
            rating={Number(venueData.commonSpaces)}
            onRatingChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="facilitationReadiness">Facilitation Readiness</FormLabel>
          <StarRating 
            id="facilitationReadiness"
            rating={Number(venueData.facilitationReadiness)}
            onRatingChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="overallRating">Overall Rating</FormLabel>
          <StarRating 
            id="overallRating"
            rating={Number(venueData.overallRating)}
            onRatingChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="levelOfSelfHosting">Level of Self-Hosting</FormLabel>
          <Select 
            id="levelOfSelfHosting" 
            placeholder="Select level of self-hosting"
            value={venueData.levelOfSelfHosting}
            onChange={onInputChange}
          >
            {selfHostingLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Checkbox 
            id="veggieVeganFriendly" 
            isChecked={venueData.veggieVeganFriendly}
            onChange={onInputChange}
          >
            Veggie/Vegan Friendly?
          </Checkbox>
        </FormControl>

        <FormControl>
          <Checkbox 
            id="canCookYourself" 
            isChecked={venueData.canCookYourself}
            onChange={onInputChange}
          >
            Can you cook yourself?
          </Checkbox>
        </FormControl>
      </SimpleGrid>

      <Flex justifyContent="space-between" mt={4}>
        <Button 
          onClick={handleBack} // Use the new handleBack function
          colorScheme="brand"
          bg="brand.blue"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          colorScheme="brand"
          bg="brand.orange"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Next
        </Button>
      </Flex>
    </VStack>
  );
}

export default VenueFormReview;
