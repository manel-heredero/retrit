import React from 'react';
import { 
  Box, 
  Image, 
  Text, 
  Heading, 
  VStack,
  HStack,
  Tag
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function ArticleCard({ article }) {
  // Format the date with a fallback
  const formattedDate = article.date 
    ? new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date not available';

  return (
    <Box 
      as={RouterLink} 
      to={`/blog/${article.slug}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: 'md',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <Image
        src={article.image}
        alt={article.title}
        height="200px"
        width="100%"
        objectFit="cover"
        fallback={<Box height="200px" bg="gray.200" />}
      />
      <Box p={4}>
        <VStack align="start" spacing={3}>
          <Heading size="md" color="brand.blue">
            {article.title}
          </Heading>
          
          <HStack spacing={4}>
            <Text color="gray.600" fontSize="sm">
              {article.readTime}
            </Text>
          </HStack>

          {article.tags && article.tags.length > 0 && (
            <HStack spacing={2}>
              {article.tags.map((tag) => (
                <Tag 
                  key={tag} 
                  size="sm" 
                  variant="subtle" 
                  colorScheme="orange"
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default ArticleCard;
