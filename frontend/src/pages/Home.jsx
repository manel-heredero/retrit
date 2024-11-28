import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import VenueFilters from '../components/VenueFilters'

function Home() {
  const [filters, setFilters] = useState({
    region: '',
    capacity: '',
    locationType: ''
  })

  const handleFilter = (newFilters) => {
    console.log('Filtering with:', newFilters)
    setFilters(newFilters)
  }

  return (
    <Box>
      <Heading mb={6}>Retreat Venues</Heading>
      <VenueFilters onFilter={handleFilter} />
      <Gallery filters={filters} />
    </Box>
  )
}

export default Home
