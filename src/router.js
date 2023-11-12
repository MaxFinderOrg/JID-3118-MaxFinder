import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import ContactUs from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";

const Router1 = () => {
  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
      </Route>
      <Route path="/posts" element={<Posts />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/account" element={<Account />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      <Route exact path='/update-profile' element={<PrivateRoute/>}>
            <Route exact path='/update-profile' element={<UpdateProfile/>}/>
      </Route>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
    </Routes>
    );
  }

  const Router2 = () => {
    return (
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
      );
    }

export default Router1;