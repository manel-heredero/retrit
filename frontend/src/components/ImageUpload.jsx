import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  useToast,
  Center,
} from '@chakra-ui/react';
import { validateImageFile, createImagePreview, convertToBase64 } from '../utils/imageUtils';

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast();

  const handleImageProcess = async (file) => {
    if (!file) return;

    setIsLoading(true);
    try {
      // Validate file
      validateImageFile(file);
      
      // Create preview
      const previewUrl = createImagePreview(file);
      setPreview(previewUrl);
      
      // Convert to base64
      const base64 = await convertToBase64(file);
      onImageSelect(base64);
    } catch (error) {
      toast({
        title: 'Error processing image',
        description: error.message,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleImageProcess(file);
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e?.dataTransfer?.files?.[0];
    if (file) {
      handleImageProcess(file);
    }
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      <Box
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragging ? "brand.orange" : "brand.blue"}
        borderRadius="md"
        p={8}
        bg={isDragging ? "brand.seasalt" : "white"}
        transition="all 0.2s"
        _hover={{ borderColor: "brand.orange" }}
      >
        <Center flexDirection="column" h="100%">
          <Text color="brand.blue" mb={4} textAlign="center">
            {isLoading ? 'Uploading...' : 'Drag and drop your image here, or'}
          </Text>
          <Button
            as="label"
            htmlFor="image-upload"
            cursor="pointer"
            isLoading={isLoading}
            variant="outline"
            borderColor="brand.blue"
            color="brand.blue"
            _hover={{ 
              bg: 'brand.seasalt',
              borderColor: 'brand.orange',
              color: 'brand.orange'
            }}
            height="40px"
            width="fit-content"
            fontWeight="medium"
          >
            Choose Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </Button>
        </Center>
      </Box>

      {preview && (
        <Box mt={4}>
          <Image
            src={preview}
            alt="Preview"
            maxH="200px"
            objectFit="cover"
            borderRadius="md"
            border="1px solid"
            borderColor="brand.platinum"
          />
        </Box>
      )}
    </VStack>
  );
};

export default ImageUpload;