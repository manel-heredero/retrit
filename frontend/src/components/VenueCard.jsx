import React from 'react'
import { Box, Image, Badge, Text, VStack } from '@chakra-ui/react'

// VenueCard component: Displays information about a single venue
function VenueCard({ venue }) {
  return (
    // Main container for the card
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* Venue image */}
      <Image src={venue.image} alt={venue.name} />

      {/* Content container */}
      <Box p="4">
        {/* Top row: Review status and country */}
        <Box display="flex" alignItems="baseline">
          {/* Badge indicating whether the venue is reviewed or not */}
          {venue.isReviewed ? (
            <Badge px="2" bg="brand.orange" color="brand.seasalt">
              Reviewed
            </Badge>
          ) : (
            <Badge px="2" bg="gray.500" color="brand.seasalt">
              Not Reviewed
            </Badge>
          )}
          {/* Country display */}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {venue.country}
          </Box>
        </Box>

        {/* Venue name */}
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          fontSize="xl"
          lineHeight="tight"
          noOfLines={1}
        >
          {venue.name}
        </Box>

        {/* Additional venue details */}
        <VStack align="start" mt={2} spacing={1}>
          {/* Venue capacity */}
          <Text fontSize="sm">{venue.capacity}</Text>
          {/* Venue location type */}
          <Text fontSize="sm">{venue.locationType}</Text>
        </VStack>
      </Box>
    </Box>
  )
}

export default VenueCard
