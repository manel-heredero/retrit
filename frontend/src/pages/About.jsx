<<<<<<< HEAD
import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import ImageUtilsTest from '../components/ImageUtilsTest';
import Footer from '../components/Footer';
=======
import { Box, Heading } from '@chakra-ui/react';
>>>>>>> parent of da391c3 (Prepping image uplaod)

const About = () => {
  return (
<<<<<<< HEAD
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>About Retrit</Heading>
      
      {/* Temporary test component */}
      <Box mb={8} p={4} borderWidth={1} borderRadius="md">
        <Heading size="md" mb={4}>Image Utils Test</Heading>
        <ImageUtilsTest />
      </Box>
=======
    <Box>
      <Heading>About Us</Heading>
    </Box>
  )
}
>>>>>>> parent of da391c3 (Prepping image uplaod)

      {/* Rest of your About page content */}
      <Footer />
    </Container>
  );
};

export default About;
