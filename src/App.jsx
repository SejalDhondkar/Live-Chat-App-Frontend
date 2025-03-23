import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from "./pages/ResetPassword";
import AppContainer from "./components/AppContainer";
import AuthContainer from "./components/AuthContainer";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { setNavigate } from "./lib/setNavigate";
import Messages from "./pages/Messages";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

   return (
   <Routes>
    <Route path='/' element={<AppContainer  />} >
      <Route index element={<Profile/>}/>
      <Route path='/settings' element={<Settings />}/>
      <Route path='/messages' element={<Messages />}/>
    </Route>
    <Route path='/' element={<AuthContainer  />} >
    <Route index path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/email/verify/:code' element={<VerifyEmail/>} />
    <Route path='/password/forgot' element={<ForgotPassword/>} />
    <Route path='/password/reset' element={<ResetPassword/>} />
    </Route>
   </Routes>
   );
};

export default App;