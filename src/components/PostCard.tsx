import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../components/Avatar';


//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
//import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
//import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileList from '../components/ProfileList';



export default function PostCard() {
    let name = "testname"
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    
    <Container sx={{ py: 8 }} maxWidth="md">
    {/* End hero unit */}
    <Grid container spacing={4}>
      {cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="div" sx={{ pt: '56.25%',}}
              image="https://media.istockphoto.com/id/1482199015/photo/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white.jpg?b=1&s=170667a&w=0&k=20&c=dmUBihopR40dgT7ccYZPidRl2mEwhjva2oHThDusNbo="/>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Heading
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Post </Button>
              <Button size="small">Edit Post</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
    
  );
}