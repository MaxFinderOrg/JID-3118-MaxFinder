import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../components/Avatar';




export default function PostCard() {
    let name = "testname"

  return (
    <Box m="auto" sx={{ minWidth: 100 , maxWidth : 200}}>
        
      <Card variant="outlined">

      
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Date Posted
      </Typography>


      <Avatar/>


      <Typography variant="h5" component="div">
       DOG NAME: {name}
      </Typography>


      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Breed
      </Typography>


      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>


    </CardContent>
    <CardActions>
      <Button href = "/" size="small">See Post</Button>
    </CardActions>
  



      </Card>
    </Box>
  );
}