import React from 'react';
import { Box, Heading, Text, Image, VStack, HStack, Badge, Container } from '@chakra-ui/react';

function VenuePage({ venue }) {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Image src={venue.image} alt={venue.name} borderRadius="lg" objectFit="cover" height="400px" width="100%" />
        
        <HStack justify="space-between" align="center">
          <Heading as="h1" size="2xl">{venue.name}</Heading>
          {venue.isReviewed && <Badge colorScheme="green">Reviewed</Badge>}
        </HStack>
        
        <HStack spacing={4}>
          <Text fontWeight="bold">{venue.country}</Text>
          <Text fontWeight="bold">{venue.region}</Text>
          <Text>{venue.capacity}</Text>
          <Text>{venue.locationType}</Text>
        </HStack>
        
        <Text fontSize="lg">{venue.description}</Text>
        
        {venue.amenities && (
          <Box>
            <Heading as="h3" size="md" mb={2}>Amenities</Heading>
            <HStack spacing={2}>
              {venue.amenities.map((amenity, index) => (
                <Badge key={index} colorScheme="blue">{amenity}</Badge>
              ))}
            </HStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default VenuePage;
