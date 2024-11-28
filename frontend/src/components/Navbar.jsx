import React from 'react'
import { Box, Flex, Link, Spacer, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box 
        px={4} 
        bg="brand.cornsilk" 
        py={4} 
        boxShadow="sm" 
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link as={RouterLink} to="/gallery" fontWeight="bold" color="brand.orange">
              <img src="/retrit.svg" alt="Logo" style={{ height: '40px' }} />
            </Link>
          </Box>
          <Spacer />
          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/about" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              About
            </Link>
            <Link as={RouterLink} to="/blog" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              Blog
            </Link>
          </Flex>
          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onOpen}
          />
        </Flex>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex direction="column">
              <Link as={RouterLink} to="/about" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                About
              </Link>
              <Link as={RouterLink} to="/blog" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                Blog
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
