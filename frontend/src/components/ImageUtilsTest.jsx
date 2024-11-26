import React from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { validateImageFile, createImagePreview, convertToBase64 } from '../utils/imageUtils';

const ImageUtilsTest = () => {
  const toast = useToast();

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Test validation
      validateImageFile(file);
      toast({
        title: 'Validation passed',
        status: 'success',
      });

      // Test preview
      const previewUrl = createImagePreview(file);
      console.log('Preview URL:', previewUrl);

      // Test base64 conversion
      const base64 = await convertToBase64(file);
      console.log('Base64 (first 100 chars):', base64.substring(0, 100));

    } catch (error) {
      toast({
        title: 'Test failed',
        description: error.message,
        status: 'error',
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Text>Test Image Utils</Text>
      <Button as="label" htmlFor="test-file">
        Select Test Image
        <input
          id="test-file"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </Button>
    </VStack>
  );
};

export default ImageUtilsTest;