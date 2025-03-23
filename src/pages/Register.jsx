import { 
    Box,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Link as ChakraLink,
    Button,
    Text,
    FormErrorMessage,
    Avatar
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register,checkUsername } from '../lib/api';
import { AVATAR_BASE_URL } from '../lib/avatar';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkMessage, setCheckMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkUsernameHandler = () => {
        setCheckMessage('')
        if(!username) return;
        const res = checkUsername({username});
        res.then(value=>{
            setCheckMessage(value.message);
        })
}
    const {
        mutate: createAccount,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: register,
        onSuccess: ()=>{
            navigate('/',{
                replace: true,
            })
        }
    })

    const avatarUrl = AVATAR_BASE_URL + encodeURIComponent(username);

    return (
        <Flex minH='100vh' align='center' justify='center'>
            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
            <Heading fontSize='4xl' mb={8}>
                    Create your account
                </Heading>
                <Avatar bg={"gray.600"} src={avatarUrl} size={"2xl"} m={"10px"}/>
                <Text color='text.muted' fontSize='xs' textAlign='center' mb={10}>
                                Customize your Avatar with username
                            </Text>
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    {
                        isError && (
                        <Box mb={3} color='red.400'>
                            {
                                error?.message || 'An error occured'
                            }
                        </Box>
                    )}
                    <Stack spacing={4}>
                        <FormControl id='email'>
                            <FormLabel>Email Address</FormLabel>
                            <Input type='email' 
                            autoFocus
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='username'>
                            <FormLabel>Username</FormLabel>
                            <Input
                            value={username}
                            onBlur={checkUsernameHandler}
                            onChange={(e)=> { setCheckMessage(''); setUsername(e.target.value)}}
                            />
                            
                            { checkMessage &&
                                <Text color='text.muted' fontSize='xs' textAlign='left' mt={2}>
                                {checkMessage}
                            </Text>
                            }
                        </FormControl>
                        <FormControl id='password'>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                            <Text color='text.muted' fontSize='xs' textAlign='left' mt={2}>
                                - Must be atleast 6 characters long
                            </Text>
                        </FormControl>
                        <FormControl id='confirmPassword'>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type='password' 
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            onKeyDown={
                                (e) => e.key === 'Enter' && createAccount({ email, password, confirmPassword })
                            }
                            />
                            <Button my={2} isDisabled={!email || password.length<6 || password !== confirmPassword || checkMessage!=='Username is available'}
                            isLoading={isPending}
                            onClick={
                                ()=> createAccount({ email, username ,password, confirmPassword })
                            }
                            >
                                Create Account
                            </Button>
                            <Text align='center' fontSize='sm' color='text.muted'>
                            Already have an account?{" "}
                            <ChakraLink as={Link} to='/login'>
                                Sign In
                            </ChakraLink>
                        </Text>
                        </FormControl>
                    </Stack>
                </Box>

            </Container>
        </Flex>
                
    )
}

export default Register;