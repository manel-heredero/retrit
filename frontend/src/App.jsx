import React, { useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Venue from './pages/Venue'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { initGA, logPageView } from './utils/analytics'

/**
 * Main App component that serves as the root of the application.
 * Handles the main layout and routing structure.
 */
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Initialize GA when component mounts
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
    if (hasConsent) {
      initGA();
      logPageView();
    }
  }, []);

  // Log page views on route change
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
    if (hasConsent) {
      logPageView();
    }
  }, [location]);

  return (
    <Box bg="brand.seasalt" minHeight="100vh">
      <ScrollToTop />
      
      {/* Only show Navbar if not on home page */}
      {!isHomePage && (
        <Box bg="brand.seasalt" position="sticky" top={0} zIndex={10}>
          <Container maxW="container.xl" centerContent>
            <Box width="100%" maxWidth="1200px">
              <Navbar />
            </Box>
          </Container>
        </Box>
      )}

      {/* Conditional Container: full-width for home, contained for other pages */}
      {isHomePage ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Container maxW="container.xl" centerContent mt={4}>
          <Box width="100%" maxWidth="1200px">
            <Routes>
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Article />} />
              <Route path="/venue/:id" element={<Venue />} />
              <Route path="/services" element={<Services />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Box>
        </Container>
      )}

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </Box>
  )
}

export default App
