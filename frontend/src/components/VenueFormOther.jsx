// src/components/VenueFormOther.jsx

import React from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import ImageUpload from './ImageUpload';
import { uploadImage } from '../services/imageService';

const VenueFormOther = ({ 
  venueData,
  onInputChange,
  onSubmit,
  onBack,
  isSubmitting,
  errors 
}) => {
  const toast = useToast();

  const handleImageSelect = async (base64String) => {
    try {
      // Upload to ImgBB through our backend
      const imageUrl = await uploadImage(base64String);
      
      // Save the URL in venue data
      onInputChange('image', imageUrl);
      
      toast({
        title: 'Image uploaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box p={4}>
      <Text mb={4}>Upload Image</Text>
      <ImageUpload 
        onImageSelect={handleImageSelect}
      />

      <Text mt={6} mb={4}>Google Maps Link</Text>
      <Input
        placeholder="Enter Google Maps link"
        value={venueData?.googleMapsLink || ''}
        onChange={(e) => onInputChange('googleMapsLink', e.target.value)}
      />

      <Box mt={6} display="flex" justifyContent="space-between">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>
        <Button 
          onClick={onSubmit}
          colorScheme="orange"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default VenueFormOther;
