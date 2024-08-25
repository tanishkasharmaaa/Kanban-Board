import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <Box
      backgroundImage={'/images/1.jpg'}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={4}
      py={8}
    >
      <Box
        maxW={{ base: '90%', md: '600px' }}
        textAlign="center"
        bgGradient="linear(to-br, blue.900, blue.700)" // Dark blue gradient background
        borderRadius="lg"
        boxShadow="2xl"
        p={{ base: 6, md: 10 }}
        color="white"
        border="2px solid teal.300" // Adding a teal border for contrast
        opacity={0.95} // Subtle transparency effect
        transform="scale(1.05)" // Slight scale for visual enhancement
      >
        <Heading
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          mb={4}
          fontFamily="'Tangerine', cursive"
          color="teal.300" // Light teal for contrast against the dark background
        >
          Welcome to Kanban Board
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          mb={6}
          color="gray.200"
        >
          Organize and manage your tasks with ease and efficiency.
        </Text>
        <Button
          onClick={() => navigate('/register')}
          colorScheme="teal"
          variant="solid"
          size="lg"
          borderRadius="full"
          _hover={{ bg: "teal.400", color: "white" }}
          px={8}
          py={6}
          boxShadow="lg"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}

export { Home };
