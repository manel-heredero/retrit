import React, { useState, useEffect, useMemo } from 'react'
import { Box, SimpleGrid, Flex, Text, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import VenueCard from './VenueCard'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import { filterAndSortVenues, paginateVenues, calculateTotalPages } from '../utils/galleryHelpers'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Gallery({ filters }) {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Fetch venues from the API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/venues`);
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
    filterAndSortVenues(venues, filters), [venues, filters])

  const paginatedVenues = useMemo(() => 
    paginateVenues(filteredAndSortedVenues, currentPage, itemsPerPage), 
    [filteredAndSortedVenues, currentPage, itemsPerPage])

  const totalPages = calculateTotalPages(filteredAndSortedVenues.length, itemsPerPage)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

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
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
}

export default Gallery
