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
    return Array.from(regions).filter(Boolean).sort()
  }, [])

  const handleFilter = () => {
    onFilter({ region, capacity, locationType })
  }

  const handleClearFilter = () => {
    setRegion('')
    setCapacity('')
    setLocationType('')
    onFilter({ region: '', capacity: '', locationType: '' })
  }

  return (
    <Box mb={6}>
      <Flex mb={4} gap={4}>
        <Select placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </Select>
        <Select placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)}>
          {venueOptions.capacityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Select placeholder="Location type" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
          {venueOptions.locationTypes.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Flex>
      <Flex justify="flex-end" gap={4}>
        <Button bg="brand.orange" onClick={handleFilter} width="120px">
          Filter
        </Button>
        <Button bg="brand.verdigris" onClick={handleClearFilter} width="120px">
          Clear Filter
        </Button>
      </Flex>
    </Box>
  )
}

export default VenueFilters
