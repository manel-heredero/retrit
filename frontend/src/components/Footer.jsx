import React from 'react';
import { Box, Container, Text, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box 
      bg="white" 
      py={6}
      px={{ base: 8, md: 16 }}
    >
      <Container maxW="container.xl">
        <VStack spacing={2} align="center">
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} retr.it - All rights reserved
          </Text>
          <Text fontSize="sm" color="gray.600">
            Made with ♥ for brave teams
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;