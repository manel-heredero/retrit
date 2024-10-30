import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Gallery from '../components/Gallery'

function Home() {
  return (
    <Box>
      <Heading mb={6}>Retreat Venues</Heading>
      <Gallery />
    </Box>
  )
}

export default Home
