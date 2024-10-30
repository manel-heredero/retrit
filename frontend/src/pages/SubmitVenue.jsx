import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

// Import all form components
import VenueFormMain from '../components/VenueFormMain';
import VenueFormReview from '../components/VenueFormReview';
import VenueFormOther from '../components/VenueFormOther';
import VenueFormThanks from '../components/VenueFormThanks';

function SubmitVenue() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [venueData, setVenueData] = useState({
    venueName: '',
    country: '',
    capacity: '',
    venueType: '',
    venueWebsite: '',
    relationToVenue: '',
    food: 0,
    sleepingComfort: 0,
    commonSpaces: 0,
    facilitationReadiness: 0,
    overallRating: 0,
    levelOfSelfHosting: '',
    veggieVeganFriendly: false,
    canCookYourself: false,
    image: null,
    googleMapsLink: '',
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setVenueData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = (step) => {
    setStep(step);
  };

  const handleSubmit = async () => {
    // Here you would typically send the data to your backend
    // For this example, we'll just simulate a successful submission
    console.log('Submitting venue data:', venueData);
    
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const getStepDescription = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Step 1/3. Please add basic data";
      case 2:
        return "Step 2/3. Please give us your opinion";
      case 3:
        return "Step 3/3. Some other optional information";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    if (isSubmitted) {
      return <VenueFormThanks venueName={venueData.venueName} />;
    }

    switch (step) {
      case 1:
        return (
          <VenueFormMain 
            venueData={venueData}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <VenueFormReview 
            venueData={venueData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <VenueFormOther 
            venueData={venueData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box bg="brand.seasalt" minHeight="calc(100vh - 64px)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="2xl" color="brand.blue">
            Submit New Venue
          </Heading>
          {!isSubmitted && (
            <Text fontSize="lg" color="brand.blue">
              {getStepDescription(step)}
            </Text>
          )}
          <Box bg="white" p={8} borderRadius="md" boxShadow="sm">
            {renderStepContent()}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default SubmitVenue;
