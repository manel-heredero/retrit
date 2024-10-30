// src/components/StarRating.jsx

import React from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function StarRating({ rating, onRatingChange, id }) {
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={StarIcon}
          color={star <= rating ? "yellow.400" : "gray.300"}
          onClick={() => onRatingChange({ target: { id, value: star } })}
          cursor="pointer"
          w={6}
          h={6}
        />
      ))}
    </HStack>
  );
}

export default StarRating;