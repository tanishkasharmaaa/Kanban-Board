import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const toast = useToast();

  let token=localStorage.getItem('accessToken')
  let user=localStorage.getItem('user');
   
  if(token&&user){
    navigate('/dashboard')
  }
  function handleForm(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (form.email === '' || form.name === '' || form.password === '') {
      toast({
        title: 'Some fields are empty.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      let res = await fetch('https://kanban-board-1-5b37.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      if (res.ok) {
        toast({
          title: 'User registered successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration failed.',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      backgroundImage={'/images/1.jpg'} // Same dark blue background image
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
        bg="blue.900" // Dark blue background for the form container
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        opacity={0.9}
        textAlign="center"
      >
        <Heading
          mb={6}
          color="blue.300" // Lighter blue for heading
          fontFamily="'Tangerine', cursive"
          fontSize="4xl"
        >
          Register
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="name" mb={4} isRequired>
            <FormLabel color="blue.200">Name</FormLabel> {/* Lighter blue labels */}
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleForm}
              placeholder="Enter your name"
              bg="white"
              focusBorderColor="blue.300"
            />
          </FormControl>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel color="blue.200">Email</FormLabel> {/* Lighter blue labels */}
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              placeholder="Enter your email"
              bg="white"
              focusBorderColor="blue.300"
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
              focusBorderColor="blue.300"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            type="submit"
            mb={4}
            _hover={{ bg: "blue.700" }}
          >
            Register
          </Button>
        </form>
        <Text color="blue.200">
          Already registered?{" "}
          <Link to="/login" style={{ color: "blue.400", textDecoration: "underline" }}>
            Go to login
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export { Register };
