/* 


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


*/



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileList from '../components/ProfilePage/ProfileList';
import PostCard from '../components/ProfilePage/PostCard';
import DeleteAccountButton from '../components/ProfilePage/DeleteAccountButton';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


function deleteProfile() {
    console.log("profile deleted");
}


export default function Album() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
        <Box sx= {{ bgcolor: 'background.paper', pt: 8,pb: 6,}}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                firstName lastName
                </Typography>

                <ProfileList/>

            </Container>
        </Box>

       <PostCard/>
    
       <Stack sx={{ pt: 4 }} direction="row" spacing={2}justifyContent="center" pb = {10}>
            
            <DeleteAccountButton />
            <Button variant="outlined">Edit Account</Button>
        </Stack>
      
      
    </ThemeProvider>
  );
}



