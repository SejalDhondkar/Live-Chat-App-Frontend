import ChatBox from "../components/ChatBox";
import { Flex, Container, Heading, Input, HStack, Box, Center } from "@chakra-ui/react";
import ChatCard from "../components/ChatCard"
import { useState, useEffect } from "react";
import { socket } from "../lib/socket";
import { getAllUsers, searchUser } from "../lib/api";

const Messages = () => {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [search, setSearch] = useState('');

    const searchUsernameOrEmail = (searchQuery) =>{
        const res = searchUser({search:searchQuery});
        res.then(value=>{
            setUsers(value);
        })
    }

    useEffect(() => {
        const res = getAllUsers();
        res.then(value=>{
            setUsers(value);
        })
        
        socket.on("updateOnlineUsers", (users) => {
            setOnlineUsers(users);
        });
    
        return () => {
            socket.off("updateOnlineUsers");
        }
    }, []);
    
    const handleUserFromChild = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
        <HStack>
            <Heading width='40%' m={4}>Chat Room</Heading>
            <Input background={"gray.700"} 
                rounded='100' 
                width='30%' 
                placeholder="Search User"
                value={search}
                onChange={(e)=> {setSearch(e.target.value); searchUsernameOrEmail(e.target.value)}}
                ></Input>
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
                            <ChatCard key={user._id} user={user} isOnline={onlineUsers.includes(user._id)} onCardClick={handleUserFromChild} />
                        ))
                    }
                    </Box>
                </Container>
                   
                <Container  p='2' minW={'60%'}>
                    {  selectedUser? <ChatBox convoUser={selectedUser} onlineUsers={onlineUsers}></ChatBox> : <Center><Heading>Start Conversations</Heading></Center> }
                </Container>
            </Flex>
            
        </>
    )
}

export default Messages;