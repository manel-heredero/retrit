import React from 'react'
import { Box, Flex, Link, Spacer, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const airtableFormUrl = import.meta.env.VITE_AIRTABLE_FORM_URL;

  return (
    <>
      <Box 
        bg="white"
        py={4} 
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link as={RouterLink} to="/gallery" fontWeight="bold" color="brand.orange">
              <img src="/retrit.svg" alt="Logo" style={{ height: '40px' }} />
            </Link>
          </Box>
          <Spacer />
          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/gallery" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              Gallery
            </Link>
            <Link as={RouterLink} to="/about" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              About
            </Link>
            <Link as={RouterLink} to="/blog" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              Blog
            </Link>
            <Link as={RouterLink} to="/services" mr={4} color="brand.blue" _hover={{ color: 'brand.orange' }}>
              Services
            </Link>
            <Link href={airtableFormUrl} target="_blank" rel="noopener noreferrer" color="brand.blue" _hover={{ color: 'brand.orange' }}>
              Add new venue
            </Link>
          </Flex>
          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon boxSize={6} />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onOpen}
            color="black"
            variant="ghost"
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
              <Link as={RouterLink} to="/gallery" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                Gallery
              </Link>
              <Link as={RouterLink} to="/about" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                About
              </Link>
              <Link as={RouterLink} to="/blog" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                Blog
              </Link>
              <Link as={RouterLink} to="/services" mb={4} color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                Services
              </Link>
              <Link href={airtableFormUrl} target="_blank" rel="noopener noreferrer" color="brand.blue" _hover={{ color: 'brand.orange' }} onClick={onClose}>
                Add new venue
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
