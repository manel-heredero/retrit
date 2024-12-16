import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import FacilitationServices from '../components/FacilitationServices';
import Footer from '../components/Footer';

function About() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={12} align="stretch">
        {/* Purpose of Retrit and Participatory Retreats */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h2" size="lg" mb={2}>Purpose of Retrit</Heading>
            <Text fontSize="md">
              Retrit is a platform designed to connect individuals and groups with unique, inspiring venues for participatory retreats. 
              Our goal is to simplify the search process while ensuring that every retreat is held in a space that enhances connection, 
              creativity, and purpose.
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb={2}>Participatory Retreats</Heading>
            <Text fontSize="md">
              Participatory retreats strike a balance between work, rest and play. They engage everyone to tap into the wisdom of the group, ideally supported by experienced facilitators who help you navigate through challenges. After a great retreat, you will walk away with a sense of accomplishment.
            </Text>
          </Box>
        </SimpleGrid>

        {/* How It Works */}
        <Box
          bg="blue.50"
          borderRadius="lg"
          px={50}
          py={16}
          textAlign="center"
          shadow="md"
        >
          <Heading as="h2" size="lg" mb={4}>Using Retrit is simple</Heading>
          <Text fontSize="lg">
            Browse our gallery of venues, use filters to narrow your search, and connect with 
            the venue directly.
          </Text>
        </Box>

        {/* Who We Are and What We Offer */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h2" size="lg" mb={2}>Who We Are</Heading>
            <Text fontSize="md">
              We are a network of facilitators and organisational consultants emerging from Ouishare, Enspiral and other like-minded communities.
              We have a lot of experience hosting and facilitating gatherings that are purposeful, memorable and impactful.
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb={2}>What We Offer</Heading>
            <Text fontSize="md">
              Retrit offers a curated collection of retreat venues, which have been reviewed by their users, not their owners. We value venues that encourage collaboration and meaningful work.
            </Text>
          </Box>
        </SimpleGrid>

        {/* Our Mission and Values */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>Our Mission and Values</Heading>
          <Text fontSize="md">
            Our mission is to help facilitators and teams to create meaningful retreat experiences. 
            We value sustainability, inclusivity, and collaboration, and we prioritise venues that share these values.
          </Text>
        </Box>
        <Box>
          <FacilitationServices />
        </Box>
        {/* Image Section */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          width="100%"
        >
          <img 
            src="/alicia.jpg" 
            alt="alicia" 
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
          />
        </Box>
        <Footer />
      </VStack>
    </Container>
  );
}

export default About;
