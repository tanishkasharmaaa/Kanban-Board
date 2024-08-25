import { useEffect, useState } from "react";
import { Box, Badge, Button, Flex, Text, FormControl, Input, Select, Textarea, Grid, useMediaQuery, VStack, HStack } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [display, setDisplay] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    status: "",
    taskDeadline: "",
  });
  const token = localStorage.getItem("accessToken");

  const getTasks = async () => {
    try {
      const res = await fetch("https://kanban-board-1-5b37.onrender.com/task/allTasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        getTasks();
        alert("Task deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateTask = (ele) => {
    setDisplay(true);
    setCurrentTask(ele);
    setForm({
      title: ele.title,
      category: ele.category,
      description: ele.description,
      status: ele.status,
      taskDeadline: new Date(ele.taskDeadline).toISOString().split("T")[0],
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (currentTask) {
      try {
        const res = await fetch(`https://kanban-board-1-5b37.onrender.com/task/updateTask/${currentTask._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          getTasks();
          setDisplay(false);
          alert("Task updated successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Responsive check for different screen sizes
  const [isSmallerScreen] = useMediaQuery("(max-width: 600px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 900px)");

  return (
    <Box bg="blue.500">
        <Navbar/>
      <Box   p={10} textAlign="center">
        
      </Box>
      <Grid 
        templateColumns={isSmallerScreen ? "1fr" : isMediumScreen ? "repeat(2, 1fr)" : "repeat(3, 1fr)"} 
        gap={6} 
        p={4}
      >
        {tasks.map((ele) => (
          <Box
            key={ele._id}
            borderRadius="md"
            p={4}
            bg={
              ele.status === "pending" ? "orange.200" :
              ele.status === "progress" ? "yellow.200" :
              "green.200"
            }
            shadow="md"
            borderWidth="1px"
            transition="all 0.2s ease-in-out"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Flex 
              direction={{ base: "column", sm: "row" }} 
              justify="space-between" 
              align="center"
            >
              <Text fontSize={{ base: "md", sm: "lg" }} fontWeight="bold">
                {ele.title}
              </Text>
              <Badge colorScheme={
                ele.status === "pending" ? "orange" :
                ele.status === "progress" ? "yellow" :
                "green"
              }>
                {ele.status}
              </Badge>
            </Flex>
            <Text mt={2}><strong>Category:</strong> {ele.category}</Text>
            <Text mt={2}><strong>Description:</strong> {ele.description}</Text>
            <Text mt={2}><strong>Deadline:</strong> {new Intl.DateTimeFormat("en-GB").format(new Date(ele.taskDeadline))}</Text>
            <HStack spacing={4} mt={4} wrap="wrap">
              <Button colorScheme="teal" onClick={() => handleUpdateTask(ele)}>
                Update
              </Button>
              <Button colorScheme="red" onClick={() => deleteTask(ele._id)}>
                Delete
              </Button>
            </HStack>

            {display && currentTask._id === ele._id && (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="white">
                <form onSubmit={handleUpdateSubmit}>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <Input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Select name="category" value={form.category} onChange={handleChange}>
                        <option value="">Select Category</option>
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
                    <FormControl isRequired>
                      <Textarea
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Select name="status" value={form.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="progress">Progress</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <Input
                        type="date"
                        placeholder="Task Deadline"
                        name="taskDeadline"
                        value={form.taskDeadline}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button colorScheme="blue" type="submit">
                      Submit
                    </Button>
                  </VStack>
                </form>
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export { TaskList };
