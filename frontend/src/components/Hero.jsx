import React from 'react'
import { Box, Container, Heading, Text, Stack, VStack, Flex } from '@chakra-ui/react'
import CustomButton from './CustomButton'

function Hero() {
  const airtableFormUrl = import.meta.env.VITE_AIRTABLE_FORM_URL;

  const handleSubmitVenue = () => {
    window.open(airtableFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box px={{ base: 4, md: 8, lg: 12 }}>
      <Flex minH="100vh" align="center">
        <Container maxW="container.xl">
          <VStack spacing={16} align="stretch">
            {/* Logo */}
            <Box 
              maxW={{ base: '100%', md: '70%' }}
              ml={{ base: 'auto', md: '0' }}
              mr={{ base: 'auto', md: '0' }}
            >
              <img 
                src="/retrit.svg" 
                alt="retr.it" 
                style={{ 
                  width: '100%',
                  display: 'block',
                }} 
              />
            </Box>

            {/* Text and Buttons Container */}
            <Flex 
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 16, md: 8 }}
              justify="space-between"
              align={{ base: 'stretch', md: 'end' }}
            >
              {/* Text Content */}
              <VStack spacing={6} align="left" flex="1">
                <Heading 
                  as="h1" 
                  fontSize={{ base: "4xl", md: "6xl" }}
                  fontWeight="black"
                  fontFamily="heading"
                  lineHeight="1.1"
                >
                  A database of<br />
                  retreat venues
                </Heading>
                <Text 
                  fontSize={{ base: "xl", md: "2xl" }}
                  maxW="600px"
                  lineHeight="1.4"
                >
                  Browse our favourite venues for participatory team retreats and offsites.
                  Put together and reviewed by their users.
                </Text>
              </VStack>

              {/* Navigation Buttons */}
              <Stack 
                spacing={1} 
                width={{ base: "100%", md: "400px" }}
              >
                <CustomButton to="/gallery" bg="cornsilk">
                  Browse venues
                </CustomButton>

                <CustomButton 
                  isExternal 
                  onClick={handleSubmitVenue}
                >
                  Submit new venue
                </CustomButton>

                <CustomButton to="/about">
                  We are facilitators
                </CustomButton>
              </Stack>
            </Flex>
          </VStack>
        </Container>
      </Flex>
    </Box>
  )
}

export default Hero