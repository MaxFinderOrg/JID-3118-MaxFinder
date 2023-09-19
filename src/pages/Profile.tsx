//import React from "react";
import React, { Component } from 'react';
import logo from './logo.svg';
import ProfilePostsTable from '../components/ProfilePostsTable';
import PostCard from '../components/PostCard';
import Avatar from '../components/Avatar';
import { Card} from '@mui/material';
import { Stack} from '@mui/material';


//const Profile = () => <h1>Profile Page</h1>;

const user = 'firstName lastName';

function formatName(user: string) {
    return user;
}

const postList = ['dog1', 'dog2', 'dog3', 'dog4', 'dog5'];  

function Profile() {
    return (
        <div>

           
            <h1>
                Hello, {formatName(user)}!
            </h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>

            
            
            <Stack direction="row" spacing={2}> 
                {postList.map(name => (  
               
                    
                    <PostCard  /> 
                
                ))}  

            </Stack>
            
           


            

        </div>
    );
  }
  //export default App;







export default Profile;