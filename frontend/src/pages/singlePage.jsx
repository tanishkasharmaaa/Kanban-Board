import {
  Box, Text, Heading, Button, Badge, Input, Textarea, Select, FormControl, FormLabel, Grid, HStack, Spinner, useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from '../components/navbar';

function SinglePage() {
  const { query } = useParams();
  const stringedQuery = query ? query.toLowerCase() : '';
  const token = localStorage.getItem('accessToken');

  const [data, setData] = useState([]);
  const [createTask, setCreateTask] = useState({
    title: "",
    category: stringedQuery,
    status: "",
    description: "",
    taskDeadline: "",
  });
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updateForm, setUpdate] = useState({
    title: "",
    category: "",
    status: "",
    description: "",
    taskDeadline: "",
  });
  const toast = useToast();

  // Handle input change for task creation
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCreateTask((prev) => ({ ...prev, [name]: value }));
  };

  // Submit created task
  const submitCreatedTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://kanban-board-1-5b37.onrender.com/task/addTask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title:createTask.title,
          category:stringedQuery,
          status:createTask.status,
          description:createTask.description,
          taskDeadline:createTask.taskDeadline
        }),
      });

      if (res.ok) {
        toast({ title: "Task created successfully", status: "success", duration: 3000, isClosable: true });
        getData()
       
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      toast({ title: "Error creating task", description: error.message, status: "error", duration: 3000, isClosable: true });
    }
  };

  // Fetch task data
  const getData = async () => {
    setLoading(true);
    setErr(false);
    try {
      const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/search?category=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const getdata = await res.json();
      if (res.ok) {
        setData(getdata);
        console.log(getdata)
       
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      setErr(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for task update
  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Toggle update form and set current task
  const handleUpdate = (ele) => {
    setDisplay(true);
    setCurrentTask(ele);
    setUpdate({
      title: ele.title,
      category: ele.category,
      description: ele.description,
      status: ele.status,
      taskDeadline: ele.taskDeadline ? new Date(ele.taskDeadline).toISOString().split('T')[0] : '',
    });
  };

  // Submit task update
  const handleUpdationSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask) {
        let res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/updateTask/${currentTask._id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateForm),
        });
        if (res.ok) {
          toast({ title: "Task updated successfully", status: "success", duration: 3000, isClosable: true });
          setUpdate({
            title: "",
            category: "",
            status: "",
            description: "",
            taskDeadline: "",
          });
          setCurrentTask(null);
          setDisplay(false); // Hide the form after successful update
          getData();
        } else {
          throw new Error('Failed to update task');
        }
      }
    } catch (error) {
      toast({ title: "Error updating task", description: error.message, status: "error", duration: 3000, isClosable: true });
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/deleteTask/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast({ title: "Task deleted successfully", status: "success", duration: 3000, isClosable: true });
        getData();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      toast({ title: "Error deleting task", description: error.message, status: "error", duration: 3000, isClosable: true });
    }
  };

  useEffect(() => {
    if (stringedQuery) {
      getData();
    }
  }, [stringedQuery]);

  return (
    <Box>
      <Navbar />
      <Box bg="blue.400" color="white" minH="100vh" p={6}>
        <Heading mb={6} textAlign="center">Manage Tasks for {query}</Heading>

        <Box bg="blue.700" p={6} borderRadius="md" mb={8}>
          <form onSubmit={submitCreatedTask}>
            <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={createTask.title} onChange={handleInput} placeholder="Task Title" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select name="category" value={createTask.category} onChange={handleInput}>
                  <option value={stringedQuery}>{query}</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={createTask.status} onChange={handleInput}>
                  <option value="progress">Progress</option>
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Deadline</FormLabel>
                <Input type="date" name="taskDeadline" value={createTask.taskDeadline} onChange={handleInput} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={createTask.description} onChange={handleInput} placeholder="Task Description" />
              </FormControl>
            </Grid>
            <Button mt={4} colorScheme="teal" type="submit">Create Task</Button>
          </form>
        </Box>

        {err ? (
          <Heading>Something went wrong</Heading>
        ) : loading ? (
          <Spinner size="xl" />
        ) : (
          !data.length ? (
            <Heading>No tasks available</Heading>
          ) : (
            <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
              {data.map((ele) => (
                <Box
                  key={ele._id}
                  bg={
                    ele.status === "pending" ? "orange.200" :
                      ele.status === "progress" ? "yellow.200" :
                        "green.200"
                  }
                  color="black"
                  p={5}
                  borderRadius="md"
                  shadow="md"
                >
                  <Heading fontSize="lg">{ele.title}</Heading>
                  <Badge mt={2} colorScheme={
                    ele.status === "pending" ? "orange" :
                      ele.status === "progress" ? "yellow" :
                        "green"
                  }>
                    {ele.status}
                  </Badge>
                  <Text mt={4}>{ele.description}</Text>
                  <Text mt={2}><strong>Deadline:</strong> {ele.taskDeadline}</Text>
                  <HStack spacing={4} mt={4}>
                    <Button colorScheme="blue" onClick={() => handleUpdate(ele)}>Update</Button>
                    <Button colorScheme="red" onClick={() => deleteTask(ele._id)}>Delete</Button>
                  </HStack>
                </Box>
              ))}
            </Grid>
          )
        )}

        {display && (
          <Box bg="blue.700" p={6} borderRadius="md" mt={8}>
            <form onSubmit={handleUpdationSubmit}>
              <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" value={updateForm.title} onChange={handleChange} placeholder="Task Title" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select name="category" value={updateForm.category} onChange={handleChange}>
                    <option value={stringedQuery}>{query}</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select name="status" value={updateForm.status} onChange={handleChange}>
                    <option value="progress">Progress</option>
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Deadline</FormLabel>
                  <Input type="date" name="taskDeadline" value={updateForm.taskDeadline} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="description" value={updateForm.description} onChange={handleChange} placeholder="Task Description" />
                </FormControl>
              </Grid>
              <Button mt={4} colorScheme="teal" type="submit">Update Task</Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export {SinglePage};
