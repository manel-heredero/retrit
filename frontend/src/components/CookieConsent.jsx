import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Stack } from '@chakra-ui/react';
import { initGA, logPageView } from '../utils/analytics';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    initGA();
    logPageView();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      p={4}
      boxShadow="lg"
      zIndex={999}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
      >
        <Text fontSize="sm">
          We use analytics cookies to understand how you use our website. This helps us improve our services.
          See our{' '}
          <Button
            as="a"
            href="/privacy-policy"
            variant="link"
            color="brand.orange"
            fontSize="sm"
          >
            privacy policy
          </Button>
          .
        </Text>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={handleDecline}
            variant="outline"
            size="sm"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            colorScheme="green"
            size="sm"
          >
            Accept
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CookieConsent;