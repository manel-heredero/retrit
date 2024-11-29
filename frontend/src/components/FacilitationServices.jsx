import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUsers, FaChalkboardTeacher, FaHandsHelping } from 'react-icons/fa';

const FacilitationServices = () => {
  const services = [
    {
      icon: FaUsers,
      title: 'Team Building',
      description: 'Foster collaboration and strengthen relationships within your team through expertly facilitated sessions.'
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Workshop Facilitation',
      description: 'Professional guidance for workshops that engage participants and achieve meaningful outcomes.'
    },
    {
      icon: FaHandsHelping,
      title: 'Process Support',
      description: 'Structured support to help your group navigate complex discussions and decision-making processes.'
    }
  ];

  return (
    <Box 
      bg="cornsilk" 
      py={8} 
      px={{ base: 8, md: 16 }}
      borderTop="1px"
      borderBottom="1px"
      borderColor="earth.500"
    >
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h2"
              size="lg"
              mb={3}
              color="darkgreen.900"
            >
              Our Facilitation Services
            </Heading>
            <Text 
              fontSize="md" 
              color="gray.600"
              maxW="2xl"
              mx="auto"
            >
              We offer professional facilitation services to help teams and organisations 
              achieve their goals through structured and effective collaboration.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} pt={4}>
            {services.map((service, index) => (
              <Box
                key={index}
                bg="white"
                p={5}
                borderRadius="lg"
                boxShadow="md"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'lg',
                }}
              >
                <Icon
                  as={service.icon}
                  w={8}
                  h={8}
                  color="darkgreen.500"
                  mb={3}
                />
                <Heading
                  as="h3"
                  size="sm"
                  mb={2}
                  color="darkgreen.900"
                >
                  {service.title}
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  {service.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Box textAlign="center" pt={4}>
            <Button
              as={Link}
              to="/services"
              size="md"
              colorScheme="green"
              px={8}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Learn More About Our Services
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default FacilitationServices;