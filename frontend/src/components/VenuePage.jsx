import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Container,
} from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon, CheckIcon } from '@chakra-ui/icons'; 

function VenuePage({ venue }) {
  const getDisplayValue = (value) => {
    return value || 'Not specified';
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill('')
      .map((_, index) => (
        <StarIcon
          key={index}
          color={index < rating ? "orange.400" : "gray.300"}
          boxSize={{ base: 4, md: 5 }}
        />
      ));
  };

  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={{ base: 4, md: 8 }} align="stretch">
        {/* Header section */}
        <VStack spacing={2} align="stretch">
          <Heading 
            as="h1" 
            size={{ base: "xl", md: "2xl" }}
            color="darkgreen.900"
          >
            {venue.venueName}
          </Heading>
          <Text fontSize={{ base: "lg", md: "2xl" }}>
            {venue.countryName}
          </Text>
        </VStack>

        {/* Grid section */}
        <Grid 
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)"
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
            fallback={<Box bg="gray.100" h={{ base: "250px", md: "400px" }} />}
          />
        </Box>

        {/* Description section */}
        {venue.description && (
          <Box>
            <Text 
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              whiteSpace="pre-wrap"
              lineHeight="tall"
            >
              {venue.description}
            </Text>
          </Box>
        )}

        {/* Website and Google Maps links section */}
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={3} 
          align="stretch"
          w="100%"
        >
          {venue.venueWebsite && (
            <Button
              leftIcon={<ExternalLinkIcon />}
              variant="outline"
              colorScheme="blue"
              onClick={() => window.open(venue.venueWebsite, '_blank')}
              size={{ base: "md", md: "md" }}
              w="100%"
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
              size={{ base: "md", md: "md" }}
              w="100%"
            >
              Google Maps
            </Button>
          )}
        </Stack>

        {/* Ratings section */}
        <VStack spacing={3} align="stretch">
          {/* Rating items */}
          {[
            { label: 'Overall Rating', value: venue.overallRating },
            { label: 'Common Spaces', value: venue.commonSpacesRating },
            { label: 'Food', value: venue.foodRating },
            { label: 'Sleeping Comfort', value: venue.sleepingComfortRating }
          ].map((item) => (
            <Stack
              key={item.label}
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: 1, md: 2 }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text 
                fontWeight="semibold" 
                w={{ base: "auto", md: "140px" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                {item.label}
              </Text>
              <HStack spacing={1}>
                {renderStars(item.value)}
              </HStack>
            </Stack>
          ))}

          {/* Facilitation Ready section */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 1, md: 2 }}
            align={{ base: 'start', md: 'center' }}
          >
            <Text 
              fontWeight="semibold" 
              w={{ base: "auto", md: "140px" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Facilitation Ready
            </Text>
            {venue.reviewed ? (
              <CheckIcon color="green.500" boxSize={{ base: 4, md: 5 }} />
            ) : (
              <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                Not yet reviewed
              </Text>
            )}
          </Stack>
        </VStack>
      </VStack>
    </Container>
  );
}

export default VenuePage;
