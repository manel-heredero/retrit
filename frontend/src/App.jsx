import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import SubmitVenue from './pages/SubmitVenue'

/**
 * Main App component that serves as the root of the application.
 * Handles the main layout and routing structure.
 */
function App() {
  return (
    // Main container with full viewport height and background color, including Navbar
    <Box bg="brand.seasalt" minHeight="100vh">
      {/* Sticky navigation bar container */}
      <Box bg="brand.seasalt" position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl" centerContent>
          {/* Constrain navbar width for larger screens */}
          <Box width="100%" maxWidth="1200px">
            <Navbar />
          </Box>
        </Container>
      </Box>

      {/* Main content container with top margin */}
      <Container maxW="container.xl" centerContent mt={4}>
        {/* Constrain content width for larger screens */}
        <Box width="100%" maxWidth="1200px">
          {/* Route configuration for different pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/submit-venue" element={<SubmitVenue />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  )
}

export default App
