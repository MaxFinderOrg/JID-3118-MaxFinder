import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import ContactUs from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import UserFields from "./pages/UserFields";
import Profile from "./pages/Profile";
import Adopt from "./pages/Adopt";

const Router = () => {  []
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/userfields" element={<UserFields />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/adopt" element={<Adopt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    );
  }

export default Router;