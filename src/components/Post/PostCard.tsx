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
import 'firebase/compat/storage';
//import Moment from 'moment';

export default function PostCard() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [tagged, setTagged] = useState('');
  const [microchipped, setMicrochipped] = useState('');
  const [spayed, setSpayed] = useState('');
  const [image, setImage] = useState('');
  const [imageRef, setImageRef] = useState('');
  
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
    const saveToFirebase = firebase.firestore();
    saveToFirebase.collection("post").add({
      name: name,
      breed: breed,
      color: color,
      size: size,
      gender: gender,
      tagged: tagged,
      microchipped: microchipped,
      spayed: spayed,
      image: imageRef,
      date: Date.now()
    });
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      // give a unique name to the file
      var fileName = "image-" + Date.now();
     // console.log(Moment(Date.now()).format('d MMM yyyy'));
      // Give reference to the bucket path where we require to store the uploaded image
      var storageRef = firebase.storage().ref('/images/' + fileName);

      // upload file to selected storage reference
      var uploadingElement = storageRef.put(event.target.files[0]);
      uploadingElement.snapshot.ref.getDownloadURL().then(
        function (imageURL) {
          setImageRef(imageURL);
        }
      );
    }
   }
   

  return (
    <Card sx={{ width: 500 }}>
      <CardHeader
        title="Report Lost Dog"
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
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />

          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Breed"
            onChange={(e) => {
              setBreed(e.target.value)
            }}
          />

          <TextField
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
            defaultValue={''}
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
                row
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>

              <FormLabel id="tagged-label">Tagged</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setTagged(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="microchipped-label">Microchipped</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setMicrochipped(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="spayed-label">Spayed/Neutered</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setSpayed(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="spayed-label">Upload a picture of your pet</FormLabel>
              <div style={{marginTop: 4}}>
                  <input type="file" onChange={onImageChange} className="filetype" />
                  {image && (<Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      marginTop: 2,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="The photo of the pet"
                    src={image}
                  />)}
                  
              </div>
              
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
