// src/components/VenueFormOther.jsx

import React, { useState } from 'react';
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
  };

  console.log('Current venue data:', venueData);

  return (
    <Box p={4}>
      <Text mb={4}>Upload Image</Text>
      <ImageUpload 
        onImageSelect={handleImageSelect}
      />

      <Text mt={6} mb={4}>Google Maps Link</Text>
      <Input
        id="googleMapsLink"
        placeholder="Enter Google Maps link"
        value={venueData?.googleMapsLink || ''}
        onChange={onInputChange}
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
          isLoading={isSubmitting || isImageUploading}
          disabled={isImageUploading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default VenueFormOther;
