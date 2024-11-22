import React from 'react';
import { Box, SimpleGrid, VStack, Text, Link } from '@chakra-ui/react';

const FooterColumn = ({ title, links }) => (
  <VStack align="flex-start" spacing={3}>
    <Text fontWeight="bold" fontSize="lg">
      {title}
    </Text>
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        color="gray.600"
        _hover={{ color: 'blue.500', textDecoration: 'none' }}
      >
        {link.label}
      </Link>
    ))}
  </VStack>
);

const Footer = () => {
  const footerColumns = [
    {
      title: "About retr.it",
      links: [
        { label: "Who we are", href: "/who-we-are" },
        { label: "Why retr.it", href: "/why-retrit" },
        { label: "Creative Commons", href: "/creative-commons" },
      ],
    },
    {
      title: "Venues",
      links: [
        { label: "Why these venues?", href: "/why-these-venues" },
        { label: "Submit Venue", href: "/submit-venue" },
        { label: "How it works", href: "/how-it-works" },
      ],
    },
    {
      title: "Join us",
      links: [
        { label: "How you can help", href: "/how-to-help" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <Box
      as="footer"
      bg="gray.50"
      py={12}
      px={4}
      mt={8}
    >
      <Box maxW="container.xl" mx="auto">
        <SimpleGrid 
          columns={{ base: 1, md: 3 }} 
          spacing={{ base: 8, md: 12 }}
        >
          {footerColumns.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </SimpleGrid>
        <Text 
          color="gray.500" 
          fontSize="sm" 
          mt={12} 
          textAlign="center"
        >
          © {new Date().getFullYear()} retr.it. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;