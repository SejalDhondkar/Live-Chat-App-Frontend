import { Box } from "@chakra-ui/react"
import React from "react"
import ChatCard from "./ChatCard"
import useAllUsers from "../hooks/useUsers"
import { useState } from "react";

// parent 

const MessagesDrawer = () => {

    const {users} = useAllUsers();

    const [selectedUser, setSelectedUser] = useState(null);
    
    const handleUserFromChild = (user) => {
        setSelectedUser(user);
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