import React from 'react'
import { Box, Container, Heading, Text, Stack, Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();
  const airtableFormUrl = import.meta.env.VITE_AIRTABLE_FORM_URL;

  const handleSubmitVenue = () => {
    window.open(airtableFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box 
      height="100vh"
      width="100vw"
      position="relative"
      overflow="hidden"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('/munichretreat.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(242, 135, 5, 0.85)',  // brand.orange with opacity
          zIndex: 1
        }}
      />

      {/* Content */}
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <Flex 
          height="100vh"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between" 
          align={{ base: 'center', md: 'center' }}
          gap={{ base: 10, md: 10 }}
          px={{ base: 4, md: 0 }}
        >
          {/* Text content */}
          <Stack 
            spacing={6} 
            flex="1"
            textAlign={{ base: 'center', md: 'left' }}
            mb={{ base: 8, md: 0 }}
          >
            <Heading 
              color="white"
              size={{ base: '2xl', md: '4xl' }}
              fontWeight="bold"
              lineHeight="1.2"
            >
              Awesome Retreat Venues
            </Heading>
            <Text 
              color="white"
              fontSize={{ base: 'xl', md: '2xl' }}
              maxW="xl"
            >
              Browse our favourite venues for meaningful and participatory team retreats and offsites.
            </Text>
          </Stack>

          {/* Buttons */}
          <Stack 
            spacing={4} 
            width={{ base: "100%", md: "300px" }}
            maxW={{ base: "400px", md: "none" }}
          >
            <Button
              size="lg"
              bg="white"
              color="brand.orange"
              _hover={{
                bg: 'brand.cornsilk',
              }}
              onClick={() => navigate('/gallery')}
              height={{ base: "50px", md: "60px" }}
              fontSize={{ base: "lg", md: "xl" }}
            >
              Explore Venues
            </Button>
            <Button
              size="lg"
              bg="white"
              color="brand.orange"
              _hover={{
                bg: 'brand.cornsilk',
              }}
              onClick={handleSubmitVenue}
              height={{ base: "50px", md: "60px" }}
              fontSize={{ base: "lg", md: "xl" }}
            >
              Submit Venue
            </Button>
            <Button
              size="lg"
              bg="white"
              color="brand.orange"
              _hover={{
                bg: 'brand.cornsilk',
              }}
              onClick={() => navigate('/about')}
              height={{ base: "50px", md: "60px" }}
              fontSize={{ base: "lg", md: "xl" }}
            >
              We Are Facilitators
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hero