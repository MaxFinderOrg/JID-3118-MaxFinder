import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { dbb } from '../firebase'; // Import the db reference from firebase.js
import Moment from 'moment';


async function getAllPosts() {
  console.log("get all posts() called");
  
  const postRef = dbb.collection('post');
  const snapshot = await postRef.get();


  if (snapshot.empty) {
    console.log('No matching documents.');
    return [];
  }  

  //console.log(typeof(snapshot));
  const postsData = snapshot.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id; // Add the auto-generated ID to the data
    return data;
  });


  return postsData;
}

const Posts = () => {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("inside useEffect");
      const postsData = await getAllPosts();
      setPosts(postsData);
    };
    
    fetchData();
  }, []);
  
  const handleAdopt = (postId) => {
    // Handle the adoption process here, e.g., navigate to an adoption page
    const url = '/adopt/' + postId;
    window.location.assign(url);
  };

  console.log(posts); // Log the raw data to the console
  


  return (
    <div>
      <div style={{ marginTop: '2em' }}>
        <Button variant="contained" href='/create-post' sx={{ width: 350 }}>Create Post</Button>
      </div>
      
      {posts.map(post => (
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        
          <Card sx={{ width: 350, mt: 5 }}>
            <CardMedia
              sx={{ height: 140 }}

              image={post.imageRef || require("../static/images/dog.jpg")}

            />
           
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                    Posted Date: {Moment(post.date).format('d MMM yyyy')}
                </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Pet Status: {post.petStatus}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Name: {post.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Location: {post.city}, {post.state} ({post.county}) 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date & Time {post.petStatus}: {post.petDateTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Color: {post.color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Breed: {post.breed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {post.size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {post.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tagged: {post.tagged}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Microchipped: {post.microchipped}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Spayed/Neutered: {post.spayed}
              </Typography>
            </CardContent>
            <CardActions>
            {post.petStatus === 'Found' && (
                <Button variant="contained" onClick={() => handleAdopt(post.id)}>
                  Adopt
                </Button>
              )}
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
             
              <Button onClick={() => {
                  const url = '/edit-post/' + post.id;
                  window.location.assign(url);
                }}>
                Edit Post 
              </Button>
             
            </CardActions>
          </Card>
      </Box>
      ))}
      
    </div>
  );
}

export default Posts;