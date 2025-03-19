import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import queryClient from "../config/queryClient";
import { socket } from "../lib/socket";
import { AVATAR_BASE_URL } from "../lib/avatar";


const UserMenu = ({user}) => {
    const navigate = useNavigate();

    const {mutate: signOut} = useMutation({
        mutationFn: logout,
        onSettled: () => {
            socket.emit("logout", user._id);
            socket.disconnect();
            queryClient.clear();
            navigate('/login', {replace: true});
        }
    })

    const avatarUrl = AVATAR_BASE_URL + encodeURIComponent(user.username);

    return (
        <Menu isLazy placement="top-end">
            <MenuButton position='absolute' right='1.5rem' top='1.5rem'>
                <Avatar src={avatarUrl} bg={"gray.600"} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={()=> navigate('/')}>Profile</MenuItem>
                <MenuItem onClick={()=> navigate('/settings')}>Settings</MenuItem>
                <MenuItem onClick={()=> signOut()}>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default UserMenu;