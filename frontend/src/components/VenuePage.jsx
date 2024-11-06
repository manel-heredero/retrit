import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
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
import { ExternalLinkIcon } from '@chakra-ui/icons';

function VenuePage({ venue }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="2xl" textAlign="center">{venue.venueName}</Heading>
        
        <HStack justify="center" spacing={4}>
          <Badge colorScheme={venue.reviewed ? "green" : "gray"}>
            {venue.reviewed ? "Reviewed" : "Not Reviewed"}
          </Badge>
          <Text fontWeight="bold">{venue.countryName}</Text>
          <Text fontWeight="bold">{venue.capacity}</Text>
        </HStack>

        {venue.image && (
          <Box borderRadius="lg" overflow="hidden">
            <Image 
              src={venue.image} 
              alt={venue.venueName}
              width="100%"
              height="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        )}

        <Grid templateColumns={isMobile ? "1fr" : "2fr 1fr"} gap={8}>
          <GridItem>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize="lg">Location Type:</Text>
                <Text>{venue.locationType}</Text>
              </Box>

              {venue.reviewed && (
                <Box>
                  <Heading size="md" mb={2}>Ratings</Heading>
                  <Text>Overall: {venue.overallRating}/5</Text>
                  <Text>Food: {venue.foodRating}/5</Text>
                  <Text>Sleeping Comfort: {venue.sleepingComfortRating}/5</Text>
                  <Text>Common Spaces: {venue.commonSpacesRating}/5</Text>
                </Box>
              )}
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Heading size="md" mb={2}>Additional Information</Heading>
                {venue.veggieFriendly && <Text>✓ Vegetarian-friendly</Text>}
                {venue.canCookSelf && <Text>✓ Self-cooking available</Text>}
              </Box>

              {(venue.venueWebsite || venue.googleMapsLink) && (
                <Box>
                  <Heading size="md" mb={2}>Links</Heading>
                  {venue.venueWebsite && (
                    <Button 
                      as="a" 
                      href={venue.venueWebsite} 
                      target="_blank" 
                      colorScheme="blue" 
                      rightIcon={<ExternalLinkIcon />}
                    >
                      Website
                    </Button>
                  )}
                  {venue.googleMapsLink && (
                    <Button 
                      as="a" 
                      href={venue.googleMapsLink} 
                      target="_blank" 
                      colorScheme="green" 
                      rightIcon={<ExternalLinkIcon />}
                    >
                      Google Maps
                    </Button>
                  )}
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}

export default VenuePage;
