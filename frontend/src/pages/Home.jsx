import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

function Home() {
  return (
    <Box>
      <Heading mb={6}>Retreat Venues</Heading>
      <Gallery />
      <Footer />
    </Box>
  )
}

export default Home
