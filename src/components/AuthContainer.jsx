import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthContainer = () => {
    const {user} = useAuth();

    return !user ? <Outlet /> : <Navigate 
                                    to='/'
                                    replace
                                    state={{
                                        redirectUrl: window.location.pathname
                                    }}
                                />
}

export default AuthContainer;