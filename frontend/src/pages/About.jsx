import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import ImageUtilsTest from '../components/ImageUtilsTest';
import Footer from '../components/Footer';

const About = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>About Retrit</Heading>
      
      {/* Temporary test component */}
      <Box mb={8} p={4} borderWidth={1} borderRadius="md">
        <Heading size="md" mb={4}>Image Utils Test</Heading>
        <ImageUtilsTest />
      </Box>

      {/* Rest of your About page content */}
      <Footer />
    </Container>
  );
};

export default About;
