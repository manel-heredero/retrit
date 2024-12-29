import React from 'react';
import { Button, Box, Flex } from '@chakra-ui/react';
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
  const buttonStyles = {
    variant: "outline",
    size: "lg",
    height: "60px",
    borderWidth: "2px",
    borderRadius: "0",
    borderColor: borderColor,
    bg: bg,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    px: 6,
    textAlign: "left",
    fontWeight: "normal",
    color: "black",
    _hover: {
      bg: 'gray.50',
      transform: 'translateY(-2px)',
      transition: 'all 0.2s',
    },
    ...props
  };

  const buttonContent = (
    <Flex width="100%" justify="space-between" align="center">
      {children}
      {rightIcon && <Box ml={2}>{rightIcon}</Box>}
    </Flex>
  );

  if (isExternal) {
    return (
      <Button
        {...buttonStyles}
        onClick={onClick}
      >
        {buttonContent}
      </Button>
    );
  }

  if (to) {
    return (
      <Button
        as={Link}
        to={to}
        {...buttonStyles}
      >
        {buttonContent}
      </Button>
    );
  }

  return (
    <Button
      {...buttonStyles}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );
};

export default CustomButton;