import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import CustomButton from './CustomButton';

const FacilitationServices = () => {
  return (
    <Box 
      bg="cornsilk" 
      py={12}
      px={12}
    >
      <Container maxW="container.xl">
        <VStack spacing={4} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h2"
              size="lg"
              mb={2}
              color="darkgreen.900"
            >
              We are facilitators
            </Heading>
            <Text 
              fontSize="md" 
              color="gray.600"
              mx="auto"
            >
              We design and facilitate retreats for teams who want to build trust, strategise, innovate and align
            </Text>
          </Box>
          <Box textAlign="center" pt={2}>
            <Box maxW="400px" mx="auto">
              <CustomButton 
                to="/services"
                borderColor="darkgreen.900"
                bg="white"
              >
                Find out more
              </CustomButton>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default FacilitationServices;