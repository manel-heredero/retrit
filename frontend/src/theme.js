import { extendTheme } from '@chakra-ui/react'

// https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25

const theme = extendTheme({
  fonts: {
    heading: `'Rethink Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    body: `'Rethink Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    brand: {
      green: '#606C38',
      darkGreen: '#283618',
      cornsilk: '#FEFAE0',
      earth: '#DDA15E',
      orange: '#BC6C25',
      black: '#000000',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.seasalt',
        color: 'brand.black',
      },
    },
  },
})

export default theme
