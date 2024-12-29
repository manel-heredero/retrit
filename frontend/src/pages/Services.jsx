import React, { useState } from 'react';
import { Box, Container, Heading, Text, VStack, SimpleGrid, useToast } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import Footer from '../components/Footer';
import CustomButton from '../components/CustomButton';

function Services() {
  const [hasCopied, setHasCopied] = useState(false);
  const toast = useToast();
  const email = 'manel@greaterthan.works';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setHasCopied(true);
        toast({
          title: "Email copied!",
          description: "Email address has been copied to clipboard",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => setHasCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const services = [
    {
      title: "Retreat Facilitation",
      description: "We design and facilitate retreats that foster meaningful connections and achieve your team's objectives."
    },
    {
      title: "Team Building",
      description: "Custom-designed activities and workshops that strengthen team bonds and improve collaboration."
    },
    {
      title: "Strategic Planning",
      description: "Structured sessions to help your team align on goals and create actionable plans."
    },
    {
      title: "Innovation Workshops",
      description: "Creative sessions designed to spark new ideas and solutions within your team."
    }
  ];

  return (
    <>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              Our Services
            </Heading>
            <Text fontSize="lg" color="gray.600">
              We help teams connect, align, and achieve their goals through facilitated experiences
            </Text>
          </Box>

          <SimpleGrid templateColumns={{ base: '1fr', md: '2fr 1fr' }} spacing={8}>
            <Box 
              bg="gray.50"
              p={8}
              borderRadius="lg"
            >
              <Text fontSize="xl" lineHeight="tall" fontWeight="semibold" mb={4}>
                We support brave organisations in creating meaningful, memorable offsites and retreats, with the right balance of working, connecting, and recharging.
              </Text>

              <Text fontSize="md" lineHeight="tall">
                We work with teams who want to improve the way they work while they work. 
                We facilitate team meetings that provide a predictable rhythm of delivery and learning. 
                Along the way, we help your team overcome the thorny issues that emerge, such as 
                genuinely holding one another accountable or sizing the work to what is actually do-able. 
                We bring new ways of collaborating, such as agile frameworks, collaborative decision making, 
                working async and advanced conversation techniques.
              </Text>
            </Box>
            <Box
              borderRadius="lg"
              overflow="hidden"
            >
              <img 
                src="/davidandtomomi.png" 
                alt="David and Tomomi" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </SimpleGrid>

          {/* Services Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {services.map((service, index) => (
              <Box 
                key={index}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                _hover={{ 
                  shadow: "md",
                  borderColor: "blue.500"
                }}
                transition="all 0.3s"
              >
                <Heading as="h3" size="md" mb={3}>
                  {service.title}
                </Heading>
                <Text color="gray.600">
                  {service.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* How We Work Section */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              How We Work
            </Heading>
            <Text fontSize="md" color="gray.600">
              Our approach is collaborative and tailored to your team's specific needs. We begin with 
              understanding your objectives, design a customised program, and facilitate experiences 
              that create lasting impact.
            </Text>
          </Box>

          {/* Contact Section */}
          <Box 
            bg="blue.50" 
            p={8} 
            borderRadius="lg"
            textAlign="center"
          >
            <Heading as="h3" size="lg" mb={4}>
              Ready to get started?
            </Heading>
            <Text fontSize="lg" mb={4}>
              Contact us to discuss how we can help your team achieve its goals.
            </Text>
            <Box maxW="400px" mx="auto">
              <CustomButton 
                onClick={handleCopyEmail}
                rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                borderColor="blue.500"
                bg="white"
              >
                {email}
              </CustomButton>
            </Box>
          </Box>
          <Box
            borderRadius="lg"
            overflow="hidden"
            width="100%"
          >
            <img 
              src="/brais.jpg" 
              alt="Brais" 
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '0.5rem',
              }}
            />
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}

export default Services;