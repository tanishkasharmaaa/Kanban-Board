import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AllTodos() {
  const card = [
    {id:1,
      title: "Project",
      image: "https://i.pinimg.com/564x/8a/03/99/8a039976c8d7c9b7e96f5f0875403668.jpg",
    },
    {
        id:2,
      title: "Gym",
      image: "https://i.pinimg.com/564x/ff/5c/df/ff5cdf266e313dbca65c0948cf86a106.jpg",
    },
    {
      title: "Home Chores",
      image: "https://i.pinimg.com/564x/39/9f/d2/399fd20cb5ba8139a24d24ea907def26.jpg",
    },
    {
      title: "Assignment",
      image: "https://i.pinimg.com/564x/4d/40/a6/4d40a69f0709d4fe3de368872a2ea15f.jpg",
    },
    {
      title: "Meeting",
      image: "https://i.pinimg.com/564x/41/cc/12/41cc12d35d3e19b9e8deff6d669bbb30.jpg",
    },
    {
      title: "Personal",
      image: "https://i.pinimg.com/564x/1f/0e/ac/1f0eac4742757d87cd43c05b6fc5f1ca.jpg",
    },
    {
      title: "Event",
      image: "https://i.pinimg.com/564x/2b/fd/40/2bfd4072dc4cffc0103388da409df9a2.jpg",
    },
    {
      title: "Other",
      image: "https://i.pinimg.com/564x/10/01/c2/1001c2a98d558fdc5d94a81fde93a572.jpg",
    },
  ];
let navigate=useNavigate()
  return (
    <SimpleGrid columns={[1, 2, 3]} mt={20} spacing={6} p={6}>
      {card.map((ele, i) => (
        <Box
        
          key={i}
          backgroundImage={`url(${ele.image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="md"
          boxShadow="lg"
          overflow="hidden"
          minH="250px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={4}
            textAlign="center"
          >
            <Heading
              color="white"
              fontSize="xl"
              mb={4}
              textTransform="capitalize"
            >
              {ele.title}
            </Heading>
            <Button onClick={()=>navigate(`/singletask/${ele.title}`)} colorScheme="teal" variant="solid" size="md">
              View
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export { AllTodos };

