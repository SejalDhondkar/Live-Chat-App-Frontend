import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton,AvatarBadge, Image } from '@chakra-ui/react'

// child

const ChatCard = ({user, onCardClick}) => {
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(user.username)}`;


    return (
        <Card maxW='md' backgroundColor='grey.800' onClick={()=>{onCardClick(user)}} p={1}>
            <CardHeader background={'teal'} rounded={30}>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar src={avatarUrl} name={user.username} bg={'gray.600'} >
                </Avatar>

                    <Box>
                    <Heading size='sm'>{user.username}</Heading>
                    <Text display={{ base: "none", md: "block" }}>{user.email}</Text>
                    </Box>
                </Flex>
                </Flex>
            </CardHeader>
        </Card>
    )
}

export default ChatCard;