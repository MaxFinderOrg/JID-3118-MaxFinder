import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { FormControl, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import { ConstructionOutlined } from '@mui/icons-material';
import Map from './Map2.tsx';

//handler
const handleClick = (event: React.MouseEvent<HTMLElement>, text: string) => {
  console.log("data printed");

  /*
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
    */
};

export default function PostCard() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [tagged, setTagged] = useState('');
  const [microchipped, setMicrochipped] = useState('');
  const [spayed, setSpayed] = useState('');
  const [petStatus, setPetStatus] = useState('');

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [city, setCity] = useState('');

  const handleMapData = (
    userLocation: { lat: number; lng: number },
    markerLocation: { lat: number; lng: number },
    address: string,
    country: string,
    state: string,
    county: string,
    city: string
  ) => {
    console.log("Received data from Map2.tsx:", {
      userLocation,
      markerLocation,
      address,
      country,
      state,
      county,
      city,
    });
    setUserLocation(userLocation);
    setMarkerLocation(markerLocation);
    setAddress(address);
    setCountry(country);
    setState(state);
    setCounty(county);
    setCity(city);
  }
  
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

  const handleSubmit = async () => {
    console.log("submit post pressed");

    const saveToFirebase = firebase.firestore();
    const collectionRef = saveToFirebase.collection("post");

    try {
      const newDocumentRef = await collectionRef.add({
        name: name,
        breed: breed,
        color: color,
        size: size,
        gender: gender,
        tagged: tagged,
        microchipped: microchipped,
        spayed: spayed,
        petStatus: petStatus,
        latitude: markerLocation?.lat,
        longitude: markerLocation?.lng,
        country: country,
        state: state,
        county: county,
        city: city,
      });

      // Retrieve the auto-generated document ID
      const documentId = newDocumentRef.id;
      console.log(`inputted info auto-generated id: ${documentId}`);
      
      // Continue with any other actions that depend on the document ID
    } catch (error) {
      console.error("Error adding document:", error);
    }

    console.log("submit pressed complete");
    window.location.href = '/posts'; // Redirect to the posts page after deletion
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card sx={{ width: 500,  }}>
      <CardHeader
        title={<div style={{ textAlign: 'center'}}>Report Pet</div>}
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
        <div>
          <h6>If you found a pet that was lost, report pet as Found. If you lost your pet, report pet as Lost.</h6>
        </div>
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
            </FormControl> 
          </Box>

          <Map onMapData={handleMapData}/>
          <h6>{address ? `Selected location: ${address}` : `Click to select location`}</h6>
          
          <Stack spacing={2} direction="row" mt={3} sx={{ ml: 1 }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" href='/posts'>Cancel</Button>
            <Button variant="contained" onClick={(e) => handleClick(e, "clicked")}>print data</Button>
            <Button variant="outlined" href='/edit-post'>Edit</Button>
          </Stack>

        </Box>
      </CardContent>

    </Card>
    </Box>
    
  );
}
