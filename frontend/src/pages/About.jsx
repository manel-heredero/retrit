import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import ImageUtilsTest from '../components/ImageUtilsTest';

function About() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading mb={4}>About Retrit</Heading>
        {/* Your about page content */}
      </Box>
      <ImageUtilsTest />
    </Container>
  );
}

export default About;
