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

export default function PostCard() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [tag, setTag] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [spayed, setSpayed] = useState('');
  
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
      tag: tag,
      microchip: microchip,
      spayed: spayed,
    });
  }

  return (
    <Card sx={{ width: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            FN
          </Avatar>
        }
        title="FirstName LastName"
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
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>

              <FormLabel id="tag-label">Tag</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setTag(e.target.value)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="microchip-label">Microchip</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setMicrochip(e.target.value)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>

              <FormLabel id="spayed-label">Spayed/Neutered</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setSpayed(e.target.value)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Stack spacing={2} direction="row" mt={3} sx={{ ml: 1 }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined">Cancel</Button>
          </Stack>

        </Box>
      </CardContent>

    </Card>
  );
}
