


import React, { useState , useEffect} from 'react';
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




export default function EditCard() {

    const transferredURL = window.location.pathname
    //const transferredURL = '/edit-post/123/4'
    const transferredID =  transferredURL.split("/")[2];
    //console.log(`url: ${transferredURL}`);
    //console.log(`transfereedID: ${transferredID}`);

    
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [gender, setGender] = useState('');
    const [tagged, setTagged] = useState('');
    const [microchipped, setMicrochipped] = useState('');
    const [spayed, setSpayed] = useState('');
    const [petStatus, setPetStatus] = useState('');
    

    
    const postRef = firebase.firestore().collection('post').doc(transferredID);
    
    
    useEffect(() => {
      const fetchData = async () => {
          try {
              const doc = await postRef.get();
              if (!doc.exists) {
                  console.log('No such document!');
              } else {
                  const data = doc.data();
                  console.log('Document data:', data);

                  // Set the state variables with the retrieved data
                  if (data) {
                    console.log("changing attributes");
                    setName(data.name);
                    setBreed(data.breed );
                    setColor(data.color);
                    setSize(data.size );
                    setGender(data.gender);
                    setTagged(data.tagged );
                    setMicrochipped(data.microchipped);
                    setSpayed(data.spayed );
                    setPetStatus(data.petStatus)
                  }

                  
              }
          } catch (error) {
              console.error('Error fetching document:', error);
          }
          
      };

      fetchData();
  }, []);



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

    // You don't need to create a collection reference here
    // You can directly reference the document by its path
    // Also, make sure `transferredID` is the correct document ID
    const postRef = saveToFirebase.collection("post").doc(transferredID);

    // Update the document with the new values from state variables
    postRef.update({
        name: name,
        breed: breed,
        color: color,
        size: size,
        gender: gender,
        tagged: tagged,
        microchipped: microchipped,
        spayed: spayed,
        petStatus: petStatus,
    })
    .then(() => {
        console.log("Document successfully updated");
    })
    .catch((error) => {
        console.error("Error updating document:", error);
    });


  }

   

  return (
    <Card sx={{ width: 500 }}>
      <CardHeader
        title="Edit Pet Report"
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
        <TextField label="Auto-generated PostID" disabled value= {transferredID}  />
          
        <Box sx={{ ml: 1, mt: 2 }}>
            <FormControl>
              <FormLabel id="petStatus-label">Pet Status</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setPetStatus(e.target.value)}
              >
                <FormControlLabel value="Found" control={<Radio />} label="Found" />
                <FormControlLabel value="Lost" control={<Radio />} label="Lost" />
              </RadioGroup>
            </FormControl>
          </Box>
          
          <TextField
            value= {name}
            required
            fullWidth
            id="outlined-required"
            label="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />

          <TextField
            value={breed}
            required
            fullWidth
            id="outlined-required"
            label="Breed"
            onChange={(e) => {
              setBreed(e.target.value)
            }}
          />

          <TextField
            value={color}
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
            value={ size}
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
                value={gender}
                row
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>

              <FormLabel id="tagged-label">Tagged</FormLabel>
              <RadioGroup
                value={tagged}
                row
                onChange={(e) => setTagged(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="microchipped-label">Microchipped</FormLabel>
              <RadioGroup
                value={microchipped}
                row
                onChange={(e) => setMicrochipped(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="spayed-label">Spayed/Neutered</FormLabel>
              <RadioGroup
                value={spayed}
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