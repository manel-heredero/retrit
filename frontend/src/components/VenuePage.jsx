import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  HStack,
  Badge,
  Grid,
  GridItem,
  Button,
  IconButton,
  useBreakpointValue,
  Container,
} from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon, CheckIcon } from '@chakra-ui/icons'; 
import Footer from './Footer'; // Importing the updated Footer component

function VenuePage({ venue }) {
  // Helper function to handle empty values
  const getDisplayValue = (value) => {
    return value || 'Not specified';
  };

  // Helper function for star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill('')
      .map((_, index) => (
        <StarIcon
          key={index}
          color={index < rating ? "orange.400" : "gray.300"}
        />
      ));
  };

  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header section (unchanged) */}
        <VStack spacing={4} align="stretch">
          <Heading 
            as="h1" 
            size="2xl" 
            color="darkgreen.900"
          >
            {venue.venueName}
          </Heading>
          <Text fontSize="2xl">
            {venue.countryName}
          </Text>
        </VStack>

        {/* Grid with responsiveness */}
        <Grid 
          templateColumns={{
            base: "1fr",          // Single column on mobile
            md: "repeat(2, 1fr)"  // Two columns on medium screens and up
          }} 
          gap={6}
        >
          <GridItem>
            <VStack align="stretch" spacing={1}>
              <Text fontWeight="semibold">Reviewed?</Text>
              <Text color={venue.reviewed ? "black" : "gray.500"}>{getDisplayValue(venue.reviewed ? "Yes" : "Not yet...")}</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align="stretch" spacing={1}>
              <Text fontWeight="semibold">Capacity</Text>
              <Text color={venue.capacity ? "black" : "gray.500"}>
                {getDisplayValue(venue.capacity)}
              </Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align="stretch" spacing={1}>
              <Text fontWeight="semibold">Location Type</Text>
              <Text color={venue.locationType ? "black" : "gray.500"}>
                {getDisplayValue(venue.locationType)}
              </Text>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align="stretch" spacing={1}>
              <Text fontWeight="semibold">Access to Nature</Text>
              <Text color={venue.proximityToNature ? "black" : "gray.500"}>
                {getDisplayValue(venue.proximityToNature)}
              </Text>
            </VStack>
          </GridItem>
        </Grid>
        {/* Image section */}
        <Box 
          borderRadius="lg" 
          overflow="hidden"
          position="relative"
        >
          <Image
            src={venue.image}
            alt={venue.venueName}
            w="100%"
            h="auto"
            objectFit="cover"
            fallback={<Box bg="gray.100" h="400px" />}
          />
        </Box>
        {/* Website and Google Maps links section */}
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={4} 
          align="stretch"
        >
          {venue.venueWebsite && (
            <Button
              leftIcon={<ExternalLinkIcon />}
              variant="outline"
              colorScheme="blue"
              onClick={() => window.open(venue.venueWebsite, '_blank')}
              borderWidth="1px"
              size="md"
              flex={{ base: '1', md: '0 auto' }}
            >
              Venue website
            </Button>
          )}
          {venue.googleMapsLink && (
            <Button
              leftIcon={<ExternalLinkIcon />}
              variant="outline"
              colorScheme="blue"
              onClick={() => window.open(venue.googleMapsLink, '_blank')}
              borderWidth="1px"
              size="md"
              flex={{ base: '1', md: '0 auto' }}
            >
              Google Maps
            </Button>
          )}
        </Stack>

        {/*Description section*/}
        <VStack spacing={4} align="stretch">
          <Text>{venue.description}</Text>
        </VStack>

        {/* Ratings section */}
        <VStack spacing={4} align="stretch">
          <HStack spacing={2}>
            <Text fontWeight="semibold" w="140px">Overall Rating</Text>
            <HStack spacing={1}>{renderStars(venue.overallRating)}</HStack>
          </HStack>

          <HStack spacing={2}>
            <Text fontWeight="semibold" w="140px">Common Spaces</Text>
            <HStack spacing={1}>{renderStars(venue.commonSpacesRating)}</HStack>
          </HStack>

          <HStack spacing={2}>
            <Text fontWeight="semibold" w="140px">Food</Text>
            <HStack spacing={1}>{renderStars(venue.foodRating)}</HStack>
          </HStack>

          <HStack spacing={2}>
            <Text fontWeight="semibold" w="140px">Sleeping Comfort</Text>
            <HStack spacing={1}>{renderStars(venue.sleepingComfortRating)}</HStack>
          </HStack>

          <HStack spacing={2}>
            <Text fontWeight="semibold" w="140px">Facilitation Ready</Text>
            {venue.reviewed ? (
              <CheckIcon color="green.500" boxSize={5} />
            ) : (
              <Text color="gray.500">Not yet reviewed</Text>
            )}
          </HStack>
        </VStack>
      </VStack>
      <Footer />
    </Container>
  );
}

export default VenuePage;
