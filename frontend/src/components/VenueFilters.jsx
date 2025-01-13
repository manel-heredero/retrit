import React, { useMemo } from 'react'
import { Box, Flex, Select, Button } from '@chakra-ui/react'
import countriesData from '../data/countries.json'
import venueOptions from '../data/venueOptions.json'

function VenueFilters({ onFilter }) {
  const [localFilters, setLocalFilters] = React.useState({
    region: '',
    capacity: '',
    locationType: ''
  })

  const uniqueRegions = useMemo(() => {
    const regions = new Set(countriesData.map(country => country.region))
    return Array.from(regions)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }, [])

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value
    }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }

  const handleClearFilter = () => {
    const clearedFilters = {
      region: '',
      capacity: '',
      locationType: ''
    }
    setLocalFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  return (
    <Box 
      mb={6} 
      mt={8}  // Added top margin
      pt={4}  // Added top padding
      bg="brand.orange" 
      p={6} 
      borderRadius="lg"
      boxShadow="md"
    >
      <Flex mb={4} gap={4} flexDir={['column', 'row']}>
        <Select 
          placeholder="Select Region" 
          value={localFilters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          bg="white"
          _hover={{ borderColor: 'brand.earth' }}
        >
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </Select>

        <Select 
          placeholder="Select Capacity" 
          value={localFilters.capacity}
          onChange={(e) => handleFilterChange('capacity', e.target.value)}
          bg="white"
          _hover={{ borderColor: 'brand.earth' }}
        >
          {venueOptions.capacityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>

        <Select 
          placeholder="Select Location Type" 
          value={localFilters.locationType}
          onChange={(e) => handleFilterChange('locationType', e.target.value)}
          bg="white"
          _hover={{ borderColor: 'brand.earth' }}
        >
          {venueOptions.locationTypes.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Flex>

      <Flex justify="flex-end" gap={4}>
        <Button 
          onClick={handleClearFilter} 
          width="120px"
          bg="brand.earth"
          color="white"
          _hover={{
            bg: 'brand.green',
          }}
        >
          Clear Filters
        </Button>
      </Flex>
    </Box>
  )
}

export default VenueFilters
