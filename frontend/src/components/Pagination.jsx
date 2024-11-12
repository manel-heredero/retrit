import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <HStack justify="center" spacing={4} mt={8}>
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        isDisabled={currentPage === 1}
        colorScheme="orange"
        variant="outline"
      >
        Previous
      </Button>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        isDisabled={currentPage === totalPages}
        colorScheme="orange"
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
}

export default Pagination;
