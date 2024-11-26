import React from 'react'
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Navbar() {
  return (
    <Box px={4} bg="brand.seasalt" pt={4} pb={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Link as={RouterLink} to="/" fontWeight="bold" color="brand.orange">
          <img src="/retrit.svg" alt="Logo" style={{ height: '40px' }} />
          </Link>
        </Box>
        <Spacer />
        <Flex alignItems={'center'}>
          <Link as={RouterLink} to="/about" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
            About
          </Link>
          <Link as={RouterLink} to="/blog" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
            Blog
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
