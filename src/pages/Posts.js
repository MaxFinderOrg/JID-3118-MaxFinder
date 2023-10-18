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


async function getAllPosts() {
  console.log("get all posts() called");
  
  const postRef = dbb.collection('post');
  const snapshot = await postRef.get();


  if (snapshot.empty) {
    console.log('No matching documents.');
    return [];
  }  

  /*
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
  
 */

  /*
  snapshot.forEach(doc => {
    console.log(doc.id);
    console.log(doc.data());
    console.log("-----------\n\n\n\n")
  });
  */

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

  console.log(posts); // Log the raw data to the console
  

  const hardcodedData = {
    "postID" : "1",
    "name": "testname",
    "breed": "testBreed",
    "color": "testColor",
    "size": "testSize",
    "gender": "testGender",
    "tagged": "testTagged",
    "microchipped": "testMicrochipped",
    "spayed": "testSpayed",
  };

  return (
    <div>
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
        <Button variant="contained" href='/create-post' sx={{ width: 350 }}>Create Post</Button>
          <Card sx={{ width: 350, mt: 5 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={require("../static/images/dog.jpg")}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Name: {post.name}
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
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
              <Button size="small" href = "/edit-post/15553">Edit Post</Button>
              
            </CardActions>
          </Card>
      </Box>
      ))}
      
    </div>
  );
}

export default Posts;