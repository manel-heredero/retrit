import React, { useMemo } from 'react'
import { Box, Flex, Select, Button } from '@chakra-ui/react'
import countriesData from '../data/countries.json'
import venueOptions from '../data/venueOptions.json'

function VenueFilters({ onFilter }) {
  const [region, setRegion] = React.useState('')
  const [capacity, setCapacity] = React.useState('')
  const [locationType, setLocationType] = React.useState('')

  const uniqueRegions = useMemo(() => {
    const regions = new Set(countriesData.map(country => country.region))
    return Array.from(regions)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }, [])

  const handleFilterChange = (field, value) => {
    let newFilters;
    switch(field) {
      case 'region':
        setRegion(value)
        newFilters = { region: value, capacity, locationType }
        break
      case 'capacity':
        setCapacity(value)
        newFilters = { region, capacity: value, locationType }
        break
      case 'locationType':
        setLocationType(value)
        newFilters = { region, capacity, locationType: value }
        break
      default:
        return
    }
    onFilter(newFilters)
  }

  const handleClearFilter = () => {
    setRegion('')
    setCapacity('')
    setLocationType('')
    onFilter({ region: '', capacity: '', locationType: '' })
  }

  return (
    <Box mb={6}>
      <Flex mb={4} gap={4} flexDir={['column', 'row']}>
        <Select 
          placeholder="Select Region" 
          value={region} 
          onChange={(e) => handleFilterChange('region', e.target.value)}
        >
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </Select>

        <Select 
          placeholder="Select Capacity" 
          value={capacity} 
          onChange={(e) => handleFilterChange('capacity', e.target.value)}
        >
          {venueOptions.capacityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>

        <Select 
          placeholder="Select Location Type" 
          value={locationType} 
          onChange={(e) => handleFilterChange('locationType', e.target.value)}
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
          colorScheme="gray"
          variant="outline"
        >
          Clear Filters
        </Button>
      </Flex>
    </Box>
  )
}

export default VenueFilters
