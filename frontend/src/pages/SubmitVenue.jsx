import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

// Import components
import VenueFormMain from '../components/VenueFormMain';
import VenueFormReview from '../components/VenueFormReview';
import VenueFormOther from '../components/VenueFormOther';
import VenueFormThanks from '../components/VenueFormThanks';

// Import from our new files
import { useForm } from '../hooks/useForm';
import { STEP_DESCRIPTIONS } from '../constants/venueFormConstants';

function SubmitVenue() {
  const {
    data: venueData,
    errors,
    step,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useForm();

  const renderStepContent = () => {
    if (isSubmitted) {
      return <VenueFormThanks venueName={venueData.venueName} />;
    }

    const commonProps = {
      venueData,
      onInputChange: handleInputChange,
      errors,
    };

    switch (step) {
      case 1:
        return (
          <VenueFormMain 
            {...commonProps}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <VenueFormReview 
            {...commonProps}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <VenueFormOther 
            {...commonProps}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
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
              {STEP_DESCRIPTIONS[step]}
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
