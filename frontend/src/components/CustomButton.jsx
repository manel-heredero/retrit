import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// Chakra Icons
import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons';
// React Icons
import { 
  HiArrowRight, 
  HiArrowNarrowRight,
  HiOutlineArrowRight,
  HiOutlineArrowNarrowRight 
} from 'react-icons/hi';
import { 
  BsArrowRight,
  BsArrowRightShort,
  BsArrowRightCircle 
} from 'react-icons/bs';

const CustomButton = ({ 
  children, 
  to, 
  onClick, 
  isExternal = false,
  borderColor = "black",
  bg = "transparent",
  ...props 
}) => {
  // Base button styles
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
    _hover: {
      bg: 'gray.50',
      transform: 'translateY(-2px)',
      transition: 'all 0.2s',
    },
    rightIcon: <HiArrowRight size="24px" />,
    ...props
  };

  // If it's an external link
  if (isExternal) {
    return (
      <Button
        {...buttonStyles}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  // If it's an internal route
  if (to) {
    return (
      <Button
        as={Link}
        to={to}
        {...buttonStyles}
      >
        {children}
      </Button>
    );
  }

  // If it's just a button with onClick
  return (
    <Button
      {...buttonStyles}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;