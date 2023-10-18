


import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase, ref, child, get } from "firebase/database";



function printData() {
  console.log("data printed");
}

export default function EditCard() {

    const transferredURL = window.location.pathname
    //const transferredURL = '/edit-post/123/4'
    const transferredID =  transferredURL.split("/")[2];
    console.log(`url: ${transferredURL}`);
    console.log(`transfereedID: ${transferredID}`);

    
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [gender, setGender] = useState('');
    const [tagged, setTagged] = useState('');
    const [microchipped, setMicrochipped] = useState('');
    const [spayed, setSpayed] = useState('');
    

    

    const hardcodedData = {
        "postID" : transferredID,
        "name": "testname",
        "breed": "testBreed",
        "color": "testColor",
        "size": "XS",
        "gender": "Female",
        "tagged": "Yes",
        "microchipped": "No",
        "spayed": "Yes",
    };


    const sizes = [
        {
        value: '',
        label: '',
        },
        {
        value: 'XS',
        label: 'XSmall (Up to 20 lbs)',
        },
        {
        value: 'S',
        label: 'Small (20 to 30 lbs)',
        },
        {
        value: 'M',
        label: 'Medium (30 to 50 lbs)',
        },
        {
        value: 'L',
        label: 'Large (50 to 90 lbs)',
        },
        {
        value: 'XL',
        label: 'XLarge (90 lbs and Up)'
        }
    ];

  const handleSubmit = () => {
    //const cityRef = db.collection('post').doc('DC');

    // Reference the document and use the update method to modify its fields
    //await saveToFirebase.collection("post").doc(documentId).update(updatedData);

    console.log("edit submit pressed");
    
    const saveToFirebase = firebase.firestore();
    const collectionRef = saveToFirebase.collection("post");
    //missing step to identify which document you want
    //this might be "transferredID"
    const documentId = collectionRef.id;


    saveToFirebase.collection("post").doc(documentId).update({
      name: name,
      breed: breed,
      color: color,
      size: size,
      gender: gender,
      tagged: tagged,
      microchipped: microchipped,
      spayed: spayed,
    });
  }

   

  return (
    <Card sx={{ width: 500 }}>
      <CardHeader
        title="Edit Lost Dog"
      />

      <CardContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
        <TextField label="Auto-generated PostID" disabled defaultValue= {hardcodedData.postID}  />
          
          <TextField
            defaultValue= {hardcodedData.name}
            required
            fullWidth
            id="outlined-required"
            label="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />

          <TextField
            defaultValue={ hardcodedData.breed}
            required
            fullWidth
            id="outlined-required"
            label="Breed"
            onChange={(e) => {
              setBreed(e.target.value)
            }}
          />

          <TextField
            defaultValue={hardcodedData.color}
            required
            fullWidth
            id="outlined-required"
            label="Color"
            onChange={(e) => {
              setColor(e.target.value)
            }}
          />

          <TextField
            id="size"
            label="Size"
            fullWidth
            required
            select
            SelectProps={{
              native: true,
            }}
            defaultValue={ hardcodedData.size}
            onChange={(e) => {
              setSize(e.target.value)
            }}
          >
            {sizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Box sx={{ ml: 1, mt: 2 }}>
            <FormControl>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                defaultValue={hardcodedData.gender}
                row
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>

              <FormLabel id="tagged-label">Tagged</FormLabel>
              <RadioGroup
                defaultValue={hardcodedData.tagged}
                row
                onChange={(e) => setTagged(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="microchipped-label">Microchipped</FormLabel>
              <RadioGroup
                defaultValue={hardcodedData.microchipped}
                row
                onChange={(e) => setMicrochipped(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="spayed-label">Spayed/Neutered</FormLabel>
              <RadioGroup
                defaultValue={hardcodedData.spayed}
                row
                onChange={(e) => setSpayed(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Stack spacing={2} direction="row" mt={3} sx={{ ml: 1 }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" href='/posts'>Cancel</Button>
            
           
          </Stack>

        </Box>
      </CardContent>

    </Card>
    
  );
}
