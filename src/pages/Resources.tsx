import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'firebase/compat/firestore';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';



const posts = [ {name: 'Animal Hospital Locator', description: 'Click here to use zip code and find a local animal hospital.',link: 'https://www.aaha.org/your-pet/hospital-locator/'}, 
                {name: 'What to do When You Find A Lost Pet', description: 'Click to find a checklist of things to do when you find a lost pet.' , link: 'https://www.americanhumane.org/fact-sheet/if-you-find-a-lost-pet/'}, 
                {name: 'No/Low Cost Veterinary Care', description: 'Click for free/low cost options for pet care' , link: 'https://www.humananimalsupportservices.org/blog/affordable-veterinary-care-options-to-support-you-and-your-pet/'},
                {name: 'Checklist to do When You Find a Lost Pet', description: 'PETA`s checklist for when you find a lost pet' , link: 'https://www.peta.org/living/animal-companions/how-to-find-missing-lost-cat-dog/?utm_source=PETA::Google&utm_medium=Ad&utm_campaign=0422::veg::PETA::Google::SEA-Vegan-Grant::::searchad&gad_source=1&gclid=CjwKCAiAmZGrBhAnEiwAo9qHibBZjsIBgHY3ma4PC1DlXIZkU_YsDbanwHrd-tmihqjTfSJTQtYjchoCRdQQAvD_BwE'},
                {name: 'Info About Animal Microchipping', description: 'Click for the American Vetrinary Medical Association' , link: 'https://www.avma.org/resources-tools/pet-owners/petcare/microchips-reunite-pets-families/microchipping-faq'}
            ]

const Resources = () => {
    return (
      <div className='center-content'>
        <div style={{ paddingTop: '2.7rem' , paddingBottom: '5.7rem' }}>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '2.7rem' 
            }}
          >
            RESOURCES
          </Typography>
        
        {posts.map(post => (
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
           
            
          }}
        >
          
            <Card sx={{ width: 550, mt: 5 }}>
              
             
                <CardContent>
            
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                {post.name}
                </Typography>

                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'normal', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {post.description}
                </Typography>
                
                
                </CardContent>
                <CardActions>
                
                
                <Button href={post.link} target="_blank" rel="noopener noreferrer">
                    Click here for website
                </Button>
               
              </CardActions>
            </Card>
        </Box>
        ))}
        
      </div>
      </div>
    
    )

}

export default Resources;

