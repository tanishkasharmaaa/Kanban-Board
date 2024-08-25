import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const toast = useToast();

  function handleForm(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch('https://kanban-board-1-5b37.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user',form.email)
        navigate('/dashboard');
      } else {
        toast({
          title: 'Invalid Credentials',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      backgroundImage={'/images/1.jpg'} // Dark blue themed background image
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box
        maxW="400px"
        w="100%"
        bg="blue.900" // Dark blue background for the card
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        opacity={0.9}
        textAlign="center"
      >
        <Heading
          mb={6}
          color="blue.300" // Lighter blue for the heading
          fontFamily="'Tangerine', cursive"
          fontSize="4xl"
        >
          Login
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel color="blue.200">Email</FormLabel> {/* Lighter blue labels */}
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              placeholder="Enter your email"
              bg="white"
              focusBorderColor="blue.300" // Lighter blue on focus
            />
          </FormControl>
          <FormControl id="password" mb={6} isRequired>
            <FormLabel color="blue.200">Password</FormLabel> {/* Lighter blue labels */}
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleForm}
              placeholder="Enter your password"
              bg="white"
              focusBorderColor="blue.300" // Lighter blue on focus
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            type="submit"
            mb={4}
            _hover={{ bg: "blue.700" }} // Darker blue on hover
          >
            Login
          </Button>
        </form>
        <Text color="blue.200">
          Not registered?{" "}
          <Link to="/register" style={{ color: "blue.400", textDecoration: "underline" }}>
            Go back to register
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export { Login };
