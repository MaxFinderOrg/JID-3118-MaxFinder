import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
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
import EditPost from "./pages/EditPost";

const Router1 = () => {
  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
      </Route>
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post" element={<EditPost />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/account" element={<Account />} />
      <Route path="/profile" element={<Profile />} />
      <Route exact path='/update-profile' element={<PrivateRoute/>}>
      <Route exact path='/update-profile' element={<UpdateProfile/>}/></Route>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    );
  }

export default Router1;