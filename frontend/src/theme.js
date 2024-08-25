// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Tangerine', cursive`, // Apply to heading elements
    body: `'Tangerine', cursive`,    // Apply to body text
  },
});

export default theme;
