import React, { useState, useEffect, useMemo } from 'react'
import { Box, SimpleGrid, Button, Flex, Text, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import VenueCard from './VenueCard'
import VenueFilters from './VenueFilters'
import { Link } from 'react-router-dom'
import { filterAndSortVenues, paginateVenues, calculateTotalPages } from '../utils/galleryHelpers'

function Gallery() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    region: '',
    capacity: '',
    locationType: ''
  })

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch venues from the API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/venues');
        console.log('Raw API Response:', response.data);
        
        if (response.data.success && Array.isArray(response.data.data)) {
          console.log('Setting venues:', response.data.data.length, 'items');
          setVenues(response.data.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Invalid data format received');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues');
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredAndSortedVenues = useMemo(() => 
    filterAndSortVenues(venues, filters), [venues, filters]);

    console.log('Filtered venues:', filteredAndSortedVenues);

  const paginatedVenues = useMemo(() => 
    paginateVenues(filteredAndSortedVenues, currentPage, itemsPerPage), 
    [filteredAndSortedVenues, currentPage, itemsPerPage]);

    console.log('Paginated venues:', paginatedVenues);

  const totalPages = calculateTotalPages(filteredAndSortedVenues.length, itemsPerPage);

  const handleFilter = (newFilters) => {
    console.log('Filtering with:', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return (
    <Flex justify="center" align="center" minH="200px">
      <Spinner size="xl" />
    </Flex>
  );

  if (error) return (
    <Flex justify="center" align="center" minH="200px">
      <Text color="red.500">{error}</Text>
    </Flex>
  );

  return (
    <Box pb={10}>
      <VenueFilters onFilter={handleFilter} />
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {paginatedVenues.map(venue => (
          <Link 
            key={venue._id} 
            to={`/venue/${venue.VenueID}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <VenueCard 
              venue={{
                ...venue,
                name: venue.venueName,
                country: venue.countryName,
                isReviewed: venue.reviewed
              }} 
            />
          </Link>
        ))}
      </SimpleGrid>
      {totalPages > 1 && (
        <Flex justifyContent="center" alignItems="center" mt={8}>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            mr={4}
            bg="brand.blue"
            color="white"
            aria-label="Previous page"
            width="40px"
            height="40px"
            padding={0}
          >
            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
              <Text fontSize="xl">&lt;</Text>
            </Flex>
          </Button>
          <Text mx={4}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            ml={4}
            bg="brand.blue"
            color="white"
            aria-label="Next page"
            width="40px"
            height="40px"
            padding={0}
          >
            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
              <Text fontSize="xl">&gt;</Text>
            </Flex>
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default Gallery
