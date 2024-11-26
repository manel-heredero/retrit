// src/components/VenueFormOther.jsx

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';

<<<<<<< HEAD
const VenueFormOther = ({ 
  venueData,
  onInputChange,
  onSubmit,
  onBack,
  isSubmitting,
  errors 
}) => {
  const toast = useToast();

  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageSelect = async (base64String) => {
    setIsImageUploading(true);
    try {
      console.log('Starting image upload...');
      
      const imageUrl = await uploadImage(base64String);
      console.log('Received image URL:', imageUrl);
      
      const syntheticEvent = {
        target: {
          id: 'image',
          value: imageUrl,
          type: 'text'
        }
      };
      
      onInputChange(syntheticEvent);
      console.log('Form state updated with image URL');
      
      toast({
        title: 'Image uploaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsImageUploading(false);
    }
=======
function VenueFormOther({ venueData, onInputChange, onSubmit, onBack }) {
  const handleBack = () => {
    onBack(2); // Go back to step 2
>>>>>>> parent of da391c3 (Prepping image uplaod)
  };

  console.log('Current venue data:', venueData);

  return (
    <VStack spacing={6} align="stretch">
      <Box bg="gray.100" p={4} borderRadius="md">
        <Text>{venueData.venueName}</Text>
      </Box>

<<<<<<< HEAD
      <Text mt={6} mb={4}>Google Maps Link</Text>
      <Input
        id="googleMapsLink"
        placeholder="Enter Google Maps link"
        value={venueData?.googleMapsLink || ''}
        onChange={onInputChange}
      />
=======
      <FormControl>
        <FormLabel htmlFor="image">Upload Image</FormLabel>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={onInputChange}
        />
      </FormControl>
>>>>>>> parent of da391c3 (Prepping image uplaod)

      <FormControl>
        <FormLabel htmlFor="googleMapsLink">Google Maps Link</FormLabel>
        <Input 
          id="googleMapsLink" 
          placeholder="Enter Google Maps link" 
          value={venueData.googleMapsLink}
          onChange={onInputChange}
        />
      </FormControl>

      <Flex justifyContent="space-between" mt={4}>
        <Button 
          onClick={handleBack}
          colorScheme="brand"
          bg="brand.blue"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
        >
          Back
        </Button>
        <Button 
          onClick={onSubmit}
<<<<<<< HEAD
          colorScheme="orange"
          isLoading={isSubmitting || isImageUploading}
          disabled={isImageUploading}
=======
          colorScheme="brand"
          bg="brand.orange"
          color="brand.seasalt"
          _hover={{ bg: 'brand.verdigris' }}
          width="auto"
>>>>>>> parent of da391c3 (Prepping image uplaod)
        >
          Submit
        </Button>
      </Flex>
    </VStack>
  );
}

export default VenueFormOther;
