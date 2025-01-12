import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Tag,
  Spinner
} from '@chakra-ui/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom styles for markdown content
  const markdownStyles = {
    h1: props => <Heading as="h1" size="2xl" my={4} {...props} />,
    h2: props => <Heading as="h2" size="xl" my={4} {...props} />,
    h3: props => <Heading as="h3" size="lg" my={3} {...props} />,
    p: props => <Text fontSize="lg" lineHeight="tall" my={4} {...props} />,
    a: props => <Text as="a" color="brand.orange" textDecoration="underline" {...props} />,
    ul: props => <Box as="ul" pl={4} my={4} {...props} />,
    ol: props => <Box as="ol" pl={4} my={4} {...props} />,
    li: props => <Text as="li" fontSize="lg" lineHeight="tall" my={2} {...props} />
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/blog/${slug}`);
        
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const result = await response.json();
        console.log('Article data:', result); // Debug log
        
        if (result.success && result.data) {
          setArticle(result.data);
        } else {
          throw new Error('Failed to load article');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <Container centerContent py={8}>
        <Spinner size="xl" color="brand.orange" />
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container centerContent py={8}>
        <Text color="red.500">Error: {error || 'Article not found'}</Text>
      </Container>
    );
  }

  // Format the date
  const formattedDate = article.date 
    ? new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date not available';

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Image
          src={article.image}
          alt={article.title}
          borderRadius="lg"
          objectFit="cover"
          height="400px"
          width="100%"
          fallback={<Box height="400px" bg="gray.200" />}
        />
    
        <VStack align="start" spacing={4}>
          <Heading as="h1" size="2xl" color="brand.blue">
            {article.title}
          </Heading>
    
          <HStack spacing={4}>
            <Text color="gray.600">
              {formattedDate}
            </Text>
            <Text color="gray.600">
              {article.readTime}
            </Text>
            <Text color="gray.600">
              By {article.author}
            </Text>
          </HStack>
    
          {article.tags && article.tags.length > 0 && (
            <HStack spacing={2}>
              {article.tags.map((tag) => (
                    <Tag 
                      key={tag} 
                      size="md" 
                      variant="subtle" 
                      colorScheme="orange"
                    >
                      {tag}
                    </Tag>
                  ))}
                </HStack>
              )}
    
              <Box className="markdown-content" w="100%">
                <ReactMarkdown
                  components={markdownStyles}
                >
                  {article.content}
                </ReactMarkdown>
              </Box>
            </VStack>
          </VStack>
        </Container>
      );
    }
    
    export default Article;