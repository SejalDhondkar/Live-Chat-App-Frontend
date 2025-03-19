import { Box, Input, Button, VStack, HStack, Text, Spacer, Heading, Avatar } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import useAllMessages from "../hooks/useMessages";
import { getAllMessages, sendMessage } from "../lib/api";
import { socket } from "../lib/socket";
import useAuth from "../hooks/useAuth";
import { encryptMessage, decryptMessage } from "../lib/encrypt";
import { AVATAR_BASE_URL } from "../lib/avatar";

const ChatBox = ({convoUser, onlineUsers}) => {
    const {user} = useAuth();
    const userId = user._id;

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behaviour: "instant"})
    }

    const avatarUrl = AVATAR_BASE_URL + encodeURIComponent(convoUser.username);
    
    // set messages
    useEffect(()=>{
        const res = getAllMessages(convoUser.username);
        res.then(value => {
            const msgs = value.map((v)=>({
                senderId: v.senderId,
                recipientId: v.recipientId,
                message: decryptMessage(v.message, v.iv),
                timestamp: v.timestamp,
                isRead: v.isRead,
                _id: v._id
            }))
            setMessages(msgs);
        })
    },[convoUser]);


    //send message

    const handleSendMessage = (message) =>{
        // encrypt the message
        const {encryptedMessage, iv} = encryptMessage(message);
        const data = {
            recipientId: convoUser._id,
            message: encryptedMessage,
            iv: iv
        }
        const res = sendMessage(data);
        res.then(value => {
            socket.emit("privateMessage", { senderId: userId, receiverId: convoUser._id, encryptedMessage: value.message, iv: value.iv });
            const decryptedMessage = decryptMessage(value.message, value.iv); 
            setMessages((prev) => [...prev, { senderId: userId, message: decryptedMessage, recipientId: convoUser._id }]);
            setInput("");
        })
    }

    useEffect(() => {
        socket.emit("register", userId);
    
        socket.on("receiveMessage", ({ senderId, encryptedMessage, iv }) => {
            const decryptedMessage = decryptMessage(encryptedMessage, iv)
            setMessages((prev) => [...prev, { senderId, message: decryptedMessage, recipientId: userId}]);
        });
    
        return () => {
            socket.off("receiveMessage");
        }
      }, [userId]);


      useEffect(() => {
        scrollToBottom()
      }, [messages]);


    return (
        <>
        
        <Box width="100%" h="70vh" bg={'gray.900'} rounded={10}
        scrollbar='hidden' 
        overflowY='auto' 
        sx={
            { 
            '::-webkit-scrollbar':{
                display:'none'
            }
        }    
    }
        >
            <HStack position="sticky" p={3} top="0" backgroundColor={'gray.900'}>
                <Avatar size='sm' src={avatarUrl} name={convoUser.username} bg={'gray.600'} ></Avatar>
                <Heading size={"sm"} >{convoUser.username}</Heading>
                { onlineUsers.includes(convoUser._id) && <Text size={"xs"} color={"teal.500"}> online </Text>}
            </HStack>
            <VStack p={2} spacing={3} align="stretch" overflowY="auto" flex={1}>
                {messages.map((msg, index) => (
                <HStack key={index} alignSelf={msg.senderId === convoUser._id ? "start" : "end"}>
                    <Box
                    bg={msg.senderId === convoUser._id ? "teal.500" : "gray.700"}
                    color={msg.senderId === convoUser._id ? "white" : "white"}
                    px={3}
                    py={2}
                    rounded='100'
                    >
                    <Text>{msg.message}</Text>
                    </Box>
                </HStack>
                
                ))}
            </VStack>
            <div ref={messagesEndRef} />
        </Box>
        <HStack m='3'>
        <Input
        background={"gray.700"} rounded='100'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        borderColor={"teal.500"}
        focusBorderColor = {"teal.500"}
        placeholder="Type a message..."
        onKeyDown={(e)=>{
            if(e.code === 'Enter') handleSendMessage(input);
        }}
        />
        <Button bgColor="teal" borderRadius={30} onClick={()=>handleSendMessage(input)}>Send</Button>
    </HStack>
    </>
    )
}

export default ChatBox;