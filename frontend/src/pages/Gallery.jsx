import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import GalleryGrid from '../components/GalleryGrid'
import VenueFilters from '../components/VenueFilters'

function Gallery() {
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
      <VenueFilters onFilter={handleFilter} />
      <GalleryGrid filters={filters} />
    </Box>
  )
}

export default Gallery