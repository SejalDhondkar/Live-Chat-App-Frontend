import { Alert, AlertIcon, Center, Heading, Text, Stack, Button, Avatar} from "@chakra-ui/react";
import { ChatIcon, EditIcon } from '@chakra-ui/icons'
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {user} = useAuth();
    const {email, verified, createdAt, username} = user;
    const navigate = useNavigate();
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(username)}`;

    return (
        <Center my={16} flexDir={"column"}>
            <Heading mb={4}>My Account</Heading>
            {
                // !verified && (
                //     <Alert status="warning" w='fit-content' borderRadius={12} mb={3}>
                //         <AlertIcon />
                //         Please verify your email
                //     </Alert>
                // )
            }
            <Avatar bg={"gray.600"} src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(username)}`} size={"xl"} m={"20px"}/>

            <Text color='white' mb={2}>
                Hello!!{" "} 
                <Text as='span' fontWeight={"bold"}>
                    {username}
                </Text>
            </Text>
            <Text color='white' mb={2}>
                You are a user since {" "}
                <Text as='span' color='gray.400'>
                {new Date(createdAt).toLocaleDateString('en-IN')} {" "} {new Date(createdAt).toLocaleTimeString('en-IN')}
                </Text>
            </Text>
            <Stack direction='row' spacing={4} mt={5}>
                <Button leftIcon={<ChatIcon />} colorScheme='teal' variant='solid' onClick={()=> navigate('/messages')}>
                    Go to Messages
                </Button>
                <Button rightIcon={<EditIcon />} colorScheme='teal' variant='outline'>
                    Create New Group
                </Button>
                </Stack>
        </Center>
    )
}

export default Profile;