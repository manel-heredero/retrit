import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  SimpleGrid, 
  Text, 
  Spinner,
  Container 
} from '@chakra-ui/react';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/blog?page=${currentPage}&limit=6`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setArticles(result.data.articles || []);
          setTotalPages(result.data.totalPages || 0);
        } else {
          setArticles([]);
          setTotalPages(0);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  if (isLoading) {
    return (
      <Container centerContent py={8}>
        <Spinner size="xl" color="brand.orange" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent py={8}>
        <Text color="red.500">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Box py={8}>
      <VStack spacing={8} align="stretch">
        <Heading 
          as="h1" 
          size="2xl" 
          color="brand.blue"
          textAlign="center"
          mb={8}
        >
          Blog
        </Heading>

        {articles.length === 0 ? (
          <Text textAlign="center" color="gray.600">
            No articles found.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </SimpleGrid>
        )}

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </VStack>
    </Box>
  );
}

export default Blog;
