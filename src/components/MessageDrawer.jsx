import { Box, Container , useDisclosure,Divider } from "@chakra-ui/react"
import React from "react"
import { Flex, Spacer, Heading } from "@chakra-ui/react"
import ChatCard from "./ChatCard"
import useAllUsers from "../hooks/useUsers"
import { useState } from "react";

// parent 

const MessagesDrawer = () => {

    const {users, isPending, isSuccess, isError} = useAllUsers();

    const [selectedUser, setSelectedUser] = useState(null);
    
    const handleUserFromChild = (user) => {
        setSelectedUser(user);
        console.log(user);
        console.log('card clicked for '+ user.username);
    };

    return (
        <>
            
                    
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
        </>
    )
}

export default MessagesDrawer;