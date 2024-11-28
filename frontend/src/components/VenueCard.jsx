import React from 'react'
import { Box, Image, Badge, Text, VStack, Flex } from '@chakra-ui/react'

// VenueCard component: Displays information about a single venue
function VenueCard({ venue }) {
  return (
    // Main container for the card
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
        borderColor: 'brand.orange',
      }}
      bg="white"
      borderColor="brand.earth"
    >
      <Box position="relative">
        {/* Venue image */}
        <Image
          src={venue.image}
          alt={venue.name}
          width="100%"
          height="250px"
          objectFit="cover"
        />
        {/* Status badge positioned absolutely over the image */}
        <Badge
          position="absolute"
          top="4"
          right="4"
          px="2"
          py="1"
          borderRadius="md"
          bg={venue.isReviewed ? 'brand.orange' : 'gray.500'}
          color="brand.cornsilk"
        >
          {venue.isReviewed ? 'Reviewed' : 'Not Reviewed'}
        </Badge>
      </Box>

      {/* Content container */}
      <Box p="6" bg="brand.cornsilk">
        <Flex justify="space-between" align="center">
          {/* Country display */}
          <Text
            color="brand.darkGreen"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            textTransform="uppercase"
          >
            {venue.country}
          </Text>
        </Flex>

        {/* Venue name */}
        <Box
          mt="2"
          fontWeight="bold"
          as="h4"
          fontSize="xl"
          lineHeight="tight"
          noOfLines={1}
          color="brand.black"
        >
          {venue.name}
        </Box>

        {/* Additional venue details */}
        <VStack align="start" mt={4} spacing={2}>
          {/* Venue capacity */}
          <Text fontSize="sm" color="brand.darkGreen">
            Capacity: {venue.capacity}
          </Text>
          {/* Venue location type */}
          <Text fontSize="sm" color="brand.darkGreen">
            {venue.locationType}
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

export default VenueCard
