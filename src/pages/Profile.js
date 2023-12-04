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
import { useAuth } from '../contexts/AuthContext';


async function getAllPosts(userID) {
  console.log("get all posts() called");
  
  const postRef = dbb.collection('post');
  const snapshot = await postRef.where('userID', '==', userID).get();

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
  
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.email : null;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("inside useEffect");
      if (userId) {
        const postsData = await getAllPosts(userId);
        setPosts(postsData);
      }
    };
    
    fetchData();
  }, [userId]);
  
  const handleAdopt = (postId) => {
    // Handle the adoption process here, e.g., navigate to an adoption page
    const url = '/adopt/' + postId;
    window.location.assign(url);
  };

  console.log(posts); // Log the raw data to the console
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0, backgroundColor: '#e6f7ff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3em', backgroundColor: '#e6f7ff' }}>
        <h2>Your Posts</h2>
      </div>
      {posts.map(post => (
         <Card
         key={post.id}
         sx={{
           width: 350,
           mt: 4, // Set a negative margin-top
           border: post.petStatus === 'Found' ? '3px solid lightgreen' : '2px solid transparent',
         }}
       >
         {/* ... existing card code */}
       
        
          <Card sx={{ width: 350, mt: 5 }}>
            <CardMedia
              sx={{ height: 140 }}

              image={post.imageRef || require("../static/images/dog.jpg")}

            />
           
           <CardContent>
            <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginBottom: 2}}>
                  {post.name}
                </Typography>
                <Typography variant="h6" component="div">
                  Date Posted: {Moment(post.date).format('MMMM Do YYYY')}
                </Typography>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center', color: post.petStatus === 'Found' ? 'lightgreen' : 'red', marginBottom: 2 }}>
                  Pet Status: {post.petStatus}
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
            <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
              <Button onClick={() => window.location.assign(`/edit-post/${post.id}`)}>
                Edit Post
              </Button>
          </CardActions>
          </Card>
          </Card>
      ))}
            <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Posts;