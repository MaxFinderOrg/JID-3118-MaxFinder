import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Posts from "./pages/Posts";
import ContactUs from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";
import EditPost from "./pages/EditPost";
import Adopt from "./pages/Adopt";

const Router1 = () => {
  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
      </Route>
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/" element={<Posts />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/account" element={<Account />} />
      <Route exact path='/update-profile' element={<PrivateRoute/>}>
      <Route exact path='/update-profile' element={<UpdateProfile/>}/></Route>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/adopt" element={<Adopt/>} />

      <Route path="/adopt/:PostID" 
        loader={({ params }) => {
          console.log(params.PostID); // link: https://reactrouter.com/en/main/route/route
        }}
        element={<Adopt />} 
      />
      
    
      <Route path="/edit-post/:PostID" 
        loader={({ params }) => {
          console.log(params.PostID); // link: https://reactrouter.com/en/main/route/route
        }}
        element={<EditPost />} 
      />
      
      <Route path="/home" 
        loader={({ params }) => {
          console.log(params); 
        }}
        element={<CreatePost />} 
      />
      

      
      <Route path="*" element={<NotFound />} />
    </Routes>
    );
  }

export default Router1;