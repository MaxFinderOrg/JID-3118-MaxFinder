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

export async function getAllPosts(searchQuery) {
  console.log("get all posts() called");
  
  const postRef = dbb.collection('post');

  let query = postRef;

  if (searchQuery) {
    query = query.where('name', '>=', searchQuery).where('name', '<=', searchQuery + '\uf8ff');
  }

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

const Posts = ({ searchQuery, filteredResults }) => {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("inside useEffect");
      const postsData = await getAllPosts(searchQuery);
      setPosts(postsData);
    };
    
    fetchData();
  }, [searchQuery]);
  
  const handleAdopt = (postId) => {
    // Handle the adoption process here, e.g., navigate to an adoption page
    const url = '/adopt/' + postId;
    window.location.assign(url);
  };

  console.log(posts); // Log the raw data to the console

  const postsToDisplay = searchQuery?.trim() !== '' ? filteredResults : posts;
  
  return (
    
    <div>
      {postsToDisplay && postsToDisplay.length > 0 ? (
      postsToDisplay.map((post, index) => (
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 1,
          m: 1,
          mt: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: post.petStatus === 'Found' ? '3px solid lightgreen' : '2px solid transparent',
        }}
        key={index}
      >
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
            <CardActions sx={{ justifyContent: 'center' }}> {/* Center the actions */}
              {post.petStatus === 'Found' && (
                <Button variant="contained" onClick={() => handleAdopt(post.id)}>
                  Adopt
                </Button>
              )}
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
         </Box>
         ))
   
         ) : (
           <p>No posts found.</p>
         )}
    </div>
  );
}

export default Posts;