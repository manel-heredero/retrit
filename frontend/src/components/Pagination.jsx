import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <HStack justify="center" spacing={4} mt={8}>
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        isDisabled={currentPage === 1}
        variant="outline"
        borderColor="brand.earth"
        _hover={{
          bg: 'brand.cornsilk',
          borderColor: 'brand.orange',
        }}
        _disabled={{
          bg: 'gray.200',
          color: 'gray.500',
          cursor: 'not-allowed',
        }}
      >
        <ChevronLeftIcon boxSize={6} />
      </Button>
      <Text color="brand.black">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        isDisabled={currentPage === totalPages}
        variant="outline"
        borderColor="brand.earth"
        _hover={{
          bg: 'brand.cornsilk',
          borderColor: 'brand.orange',
        }}
        _disabled={{
          bg: 'gray.200',
          color: 'gray.500',
          cursor: 'not-allowed',
        }}
      >
        <ChevronRightIcon boxSize={6} />
      </Button>
    </HStack>
  );
}

export default Pagination;
