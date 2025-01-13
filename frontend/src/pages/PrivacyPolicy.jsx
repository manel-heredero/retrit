import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

function PrivacyPolicy() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Privacy Policy</Heading>
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>Analytics</Heading>
          <Text mb={4}>
            We use Google Analytics to understand how visitors interact with our website. 
            This service may collect:
          </Text>
          <Text>• Pages visited and time spent on each page</Text>
          <Text>• Your approximate location (country/city level)</Text>
          <Text>• Your device type and browser information</Text>
          <Text>• Referral source (how you found our website)</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Cookies</Heading>
          <Text mb={4}>
            Google Analytics uses cookies to collect this information. You can decline 
            these cookies through our cookie consent banner or your browser settings.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Data Usage</Heading>
          <Text mb={4}>
            We use this data only to improve our website and understand our audience. 
            We do not:
          </Text>
          <Text>• Collect personally identifiable information</Text>
          <Text>• Share your data with third parties (except Google Analytics)</Text>
          <Text>• Use the data for marketing purposes</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Contact</Heading>
          <Text>
            For privacy-related questions: [Your Email]
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}

export default PrivacyPolicy;