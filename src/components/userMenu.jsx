import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import queryClient from "../config/queryClient";


const UserMenu = ({user}) => {
    const navigate = useNavigate();

    const {mutate: signOut} = useMutation({
        mutationFn: logout,
        onSettled: () => {
            queryClient.clear();
            navigate('/login', {replace: true});
        }
    })

    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(user.username)}`;

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