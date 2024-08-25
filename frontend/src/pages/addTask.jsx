import { Box, FormControl, FormLabel, Input, Select, Textarea, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from "../components/navbar";

function AddTasks() {
  let [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    status: "",
    taskDeadline: ""
  });
  
  let token = localStorage.getItem('accessToken');
  let navigate = useNavigate();

  function handleForm(e) {
    let { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      let res = await fetch('https://kanban-board-1-5b37.onrender.com/task/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        alert('Task added successfully');
        navigate('/taskList');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Box bgColor={'blue.400'} minH="100vh" pt={6} color="white">
      <Navbar />
      <Heading mb={6} textAlign="center" color="white">Add New Task</Heading>
      <Box 
        maxW="500px" 
        mx="auto" 
       bgColor={'blue.300'}
        p={6} 
        borderRadius="md" 
        boxShadow="lg" 
        color="white"
        borderWidth="1px"
        borderColor="blue.800"
      >
        <form onSubmit={handleFormSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel color="white">Title</FormLabel>
            <Input
              type="text"
              placeholder="Task Title"
              name="title"
              value={form.title}
              onChange={handleForm}
              bg="blue.400"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel color="white">Category</FormLabel>
            <Select
              placeholder="Select Category"
              name="category"
              value={form.category}
              onChange={handleForm}
              bg="blue.400"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            >
              <option value="project">Project</option>
              <option value="assignment">Assignment</option>
              <option value="meeting">Meeting</option>
              <option value="personal">Personal Work</option>
              <option value="event">Event</option>
              <option value="gym">Gym</option>
              <option value="homeChores">Home Chores</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel color="white">Description</FormLabel>
            <Textarea
              placeholder="Task Description"
              name="description"
              value={form.description}
              onChange={handleForm}
              bg="blue.400"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel color="white">Status</FormLabel>
            <Select
              placeholder="Select Status"
              name="status"
              value={form.status}
              onChange={handleForm}
              bg="blue.400"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            >
              <option value="progress">Progress</option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </Select>
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel color="white">Task Deadline</FormLabel>
            <Input
              type="date"
              name="taskDeadline"
              value={form.taskDeadline}
              onChange={handleForm}
              bg="blue.400"
              color="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Add Task
          </Button>
        </form>
        <Button
          as={Link}
          to="/taskList"
          colorScheme="blue"
          mt={6}
          width="full"
        >
          See All Tasks
        </Button>
      </Box>
    </Box>
  );
}

export { AddTasks };
