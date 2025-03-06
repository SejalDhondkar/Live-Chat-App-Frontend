import ChatBox from "../components/ChatBox";
import { Flex, Container, Heading, Input, HStack, Box } from "@chakra-ui/react";
import ChatCard from "../components/ChatCard"
import useAllUsers from "../hooks/useUsers"
import { useState } from "react";

const Messages = () => {
    const {users, isPending, isSuccess, isError} = useAllUsers();

    const [selectedUser, setSelectedUser] = useState(null);
    
    const handleUserFromChild = (user) => {
        setSelectedUser(user);
        console.log('card clicked for '+ user.username);
    };

    return (
        <>
        <HStack>
            <Heading width='40%' m={4}>Recent Chats</Heading>
            <Input background={"gray.700"} rounded='100' width='30%' placeholder="Search User"></Input>
        </HStack>
        
        <Flex alignContent={"center"}>
                <Container p='2' m='0' width='40%' >
                    <Box height='75vh' 
                        scrollbar='hidden' 
                        overflowY='auto' 
                        sx={
                            { 
                            '::-webkit-scrollbar':{
                                display:'none'
                            }
                            }
                    }>
                    {
                        users.map((user) => (
                            <ChatCard key={user._id} user={user} onCardClick={handleUserFromChild} />
                        ))
                    }
                    </Box>
                </Container>
                   
                <Container  p='2' minW={'60%'}>
                    {  selectedUser? <ChatBox convoUser={selectedUser}></ChatBox> : <Heading>Start Converstaions</Heading>}
                </Container>
            </Flex>
            
        </>
    )
}

export default Messages;