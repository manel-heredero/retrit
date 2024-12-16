import React from 'react';
import { Button, Box, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CustomButton = ({ 
  children, 
  to, 
  onClick, 
  isExternal = false,
  borderColor = "black",
  bg = "transparent",
  rightIcon,
  ...props 
}) => {
  // Use breakpointValue to conditionally render the rightIcon
  const showIcon = useBreakpointValue({ base: false, md: true });

  const renderButton = (buttonProps) => (
    <Button
      variant="outline"
      size="lg"
      height="60px"
      borderWidth="2px"
      borderRadius="0"
      borderColor={borderColor}
      bg={bg}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      px={6}
      textAlign="left"
      fontWeight="normal"
      _hover={{
        bg: 'gray.50',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s',
      }}
      {...buttonProps}
      {...props}
    >
      {children}
      {showIcon && rightIcon}
    </Button>
  );

  if (isExternal) {
    return renderButton({ onClick });
  }

  if (to) {
    return renderButton({ as: Link, to });
  }

  return renderButton({ onClick });
};

export default CustomButton;