import { Box, Image, Button, IconButton, useDisclosure, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, WrapItem, Avatar, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";


function Navbar() {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallScreen] = useMediaQuery("(max-width: 400px)");

    function handleLogout() {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <Box
            as="nav"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="#002D72" // Dark blue background
            color="white"
            p={{ base: 2, md: 4 }} // Padding adjusts based on screen size
            boxShadow="md"
            w="100%" // Full width
            position="fixed" // Sticky Navbar
            top="0"
            zIndex="1000"
        >
            {/* Logo Section */}
            <Box ml={{ base: 2, md: 4 }} display="flex" alignItems="center">
                {/* Drawer button for small screens */}
                {isSmallScreen && (
                    <IconButton
                        aria-label="Menu"
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                        variant="outline"
                        colorScheme="whiteAlpha"
                        mr={2}
                        _hover={{ bg: 'whiteAlpha.200' }}
                    />
                )}
                
                <Heading
                onClick={()=>navigate('/dashboard')}
                    
                    width={{ base: '200px', md: '250px' }} // Adjust size based on screen width
                >Kanban-GO</Heading>
            </Box>

            {/* User Info & Logout Section */}
            <Box
                display="flex"
                alignItems="center"
                gap={4}
                mr={{ base: 2, md: 4 }}
                fontSize={{ base: 'sm', md: 'md' }} // Smaller font for mobile
            >
                {/* Only show links in the Navbar when the screen size is larger than 400px */}
                {!isSmallScreen && (
                    <Box
                        display="flex"
                        justifyContent={'space-between'}
                        gap={{ base: 2, md: 6 }} // Adjust gap between links based on screen size
                        alignItems="center"
                        fontSize={{ base: 'sm', md: 'lg' }} // Smaller font on mobile
                    >
                        <Link
                            to="/addTasks"
                            fontWeight="bold"
                            _hover={{ textDecoration: 'underline', color: '#D0E7FF' }}
                        >
                            Add Tasks
                        </Link>
                        <Link
                            to="/taskList"
                            fontWeight="bold"
                            _hover={{ textDecoration: 'underline', color: '#D0E7FF' }}
                        >
                            All Tasks
                        </Link>
                        <Button
                            onClick={handleLogout}
                            colorScheme="blue"
                            variant="outline"
                            size={{ base: 'sm', md: 'md' }} // Smaller button for mobile
                            _hover={{ bg: '#003B79', color: 'white' }}
                        >
                            Logout
                        </Button>
                    </Box>
                )}
                <WrapItem>
                    <Avatar name={user} />
                </WrapItem>
            </Box>

            {/* Drawer for small screens */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="#003B79" color="white"> {/* Darker blue background for drawer */}
                    <DrawerCloseButton _hover={{ bg: 'whiteAlpha.200' }} />
                    <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.300">
                        <Box color="#D0E7FF" fontWeight="bold" fontSize="lg">
                            Menu
                        </Box>
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={6} // Increase spacing for a cleaner layout
                            mt={4}
                            fontSize="lg" // Adjusted font size
                        >
                            <Link
                                to="/addTasks"
                                onClick={onClose}
                                fontWeight="bold"
                                _hover={{ textDecoration: 'underline', color: '#D0E7FF' }}
                            >
                                Add Tasks
                            </Link>
                            <Link
                                to="/taskList"
                                onClick={onClose}
                                fontWeight="bold"
                                _hover={{ textDecoration: 'underline', color: '#D0E7FF' }}
                            >
                                All Tasks
                            </Link>
                            <Button
                                onClick={() => {
                                    handleLogout();
                                    onClose();
                                }}
                                colorScheme="blue"
                                variant="outline"
                                _hover={{ bg: '#004C99', color: 'white' }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

export { Navbar };
