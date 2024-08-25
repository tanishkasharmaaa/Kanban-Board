import { 
  Box, Text, Heading, Button, Badge, Input, Textarea, Select, FormControl, FormLabel, Grid, HStack 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Navbar} from '../components/navbar'

function SinglePage() {
  const { query } = useParams();
  const stringedQuery = query.toLowerCase();
  const token = localStorage.getItem('accessToken');

  const [data, setData] = useState([]);
  const [createTask, setCreateTask] = useState({
    title: "",
    category: stringedQuery,
    status: "",
    description: "",
    taskDeadline: ""
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
    taskDeadline: ""
  });

  // Handle input change for task creation
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCreateTask(prev => ({ ...prev, [name]: value }));
  };

  // Submit created task
  const submitCreatedTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://kanban-board-1-5b37.onrender.com/task/addTask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(createTask)
      });

      if (res.ok) {
        alert("Task created Successfully");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch task data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/search?category=${stringedQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const getData = await res.json();
      if (res.ok) {
        setData(getData);
      }
    } catch (error) {
      setErr(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle display of update form
  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (ele) => {
    setDisplay(prev => !prev);
    setCurrentTask(ele);
    setUpdate({
      title: ele.title,
      category: ele.category,
      description: ele.description,
      status: ele.status,
      taskDeadline: new Date(ele.taskDeadline).toISOString().split('T')[0]
    });
  };

  async function handleUpdationSubmit(e) {
    e.preventDefault();
    try {
      if (currentTask) {
        let res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/updateTask/${currentTask._id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updateForm)
        });
        if (res.ok) {
          alert('Task updated');
          getData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/deleteTask/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Task deleted successfully');
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (<Box>
    <Navbar/>
     <Box bg="blue.400" color="white" minH="100vh" p={6}>
      
      <Heading mb={6} textAlign="center">Manage Tasks for {query}</Heading>
      
      <Box bg="blue.700" p={6} borderRadius="md" mb={8}>
        <form onSubmit={submitCreatedTask} p={6}>
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
        <Heading>Loading...</Heading>
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
                <Text mt={2}><strong>Category:</strong> {ele.category}</Text>
                <Text><strong>Deadline:</strong> {new Intl.DateTimeFormat('en-GB').format(new Date(ele.taskDeadline))}</Text>
                <HStack spacing={4} mt={4} wrap="wrap"><Button  colorScheme="teal" onClick={() => handleUpdate(ele)}>Update</Button>
                <Button colorScheme="red" onClick={() => deleteTask(ele._id)}>Delete</Button></HStack>
                
                {display && currentTask?._id === ele._id && (
                  <form onSubmit={handleUpdationSubmit}>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Title</FormLabel>
                      <Input name="title" value={updateForm.title} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Category</FormLabel>
                      <Select name="category" value={updateForm.category} onChange={handleChange}>
                        <option value="project">Project</option>
                        <option value="assignment">Assignment</option>
                        <option value="meeting">Meeting</option>
                        <option value="personal">Personal Work</option>
                        <option value="event">Event</option>
                        <option value="gym">Gym</option>
                        <option value="homeChores">Home Chores</option>
                        <option value="grocery">Grocery</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Status</FormLabel>
                      <Select name="status" value={updateForm.status} onChange={handleChange}>
                        <option value="progress">Progress</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Deadline</FormLabel>
                      <Input type="date" name="taskDeadline" value={updateForm.taskDeadline} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea name="description" value={updateForm.description} onChange={handleChange} />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" type="submit">Update Task</Button>
                  </form>
                )}
              </Box>
            ))}
          </Grid>
        )
      )}
    </Box>
  </Box>
   
  );
}

export  {SinglePage};
