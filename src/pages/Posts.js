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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();

  const getPosts = async() => {
    const response = db.collection('post');
    const data = await response.get();
    const temp_posts = []
    data.docs.forEach(item => {
      temp_posts.push(item.data())
    })
    setPosts(temp_posts)
  }

  useEffect(() => {
    getPosts()
  }, [posts])

  return (
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
      {posts && posts.map(post => {
        return(
          <Card key={post.name} sx={{ width: 350, mt: 5 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={post.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.name}
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
            </CardActions>
          </Card>
        )
      })}
    </Box>
  );
}

export default Posts;