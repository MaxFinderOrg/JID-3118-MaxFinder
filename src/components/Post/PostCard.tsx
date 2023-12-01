import React, { ChangeEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { MuiTelInput } from 'mui-tel-input'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase, ref, child, get } from "firebase/database";
import {getDownloadURL} from "firebase/storage";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { ConstructionOutlined, SentimentSatisfiedAlt } from '@mui/icons-material';
import Map from './Map2';
import 'firebase/compat/storage';
import { useAuth } from '../../contexts/AuthContext';


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
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [tagged, setTagged] = useState('');
  const [microchipped, setMicrochipped] = useState('');
  const [spayed, setSpayed] = useState('');
  const [petStatus, setPetStatus] = useState('');
  const [image, setImage] = useState('');
  const [imageRef, setImageRef] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [city, setCity] = useState('');
  const [enteredLocation, setEnteredLocation] = useState<{ lat: number; lng: number } | null>(null); 

  var moment = require('moment');
  var currentTime = moment().format('YYYY-MM-DDTHH:mm');
  const [petDateTime, setPetDateTime] = React.useState<Dayjs | null>(dayjs(currentTime));
  
  const [addressError, setAddressError] = useState(false);
  const [manualEntry, setManualEntry] = useState('');
    
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
    setEnteredLocation (null);
    setManualEntry('');
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

  const handlePhoneChange = (newPhone: any) => {
    setPhoneNumber(newPhone)
  }

  const handleSubmit = async () => {
    console.log("submit post pressed");

    // Define an array to store the names of missing fields
    const missingFields = [];

    // Check each required field
    if (!petStatus) missingFields.push('Pet Status');
    if (!name) missingFields.push('Name');
    if (!breed) missingFields.push('Breed');
    if (!color) missingFields.push('Color');
    if (!size) missingFields.push('Size');
    if (!gender) missingFields.push('Gender');
    if (!tagged) missingFields.push('Tagged');
    if (!microchipped) missingFields.push('Microchipped');
    if (!spayed) missingFields.push('Spayed/Neutered');

    // Check if there are any missing fields
    if (missingFields.length > 0) {
      // Display an error message with the names of missing fields
      alert(`Please fill in the following fields before submitting: ${missingFields.join(', ')}`);
      return;
    }

    const saveToFirebase = firebase.firestore();
    const collectionRef = saveToFirebase.collection("post");
    const petDateTimeString = petDateTime ? petDateTime.format('YYYY MMMM DD h:mm A') : Date.now()

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
        latitude: markerLocation ? markerLocation.lat : enteredLocation?.lat,
        longitude: markerLocation ? markerLocation.lng : enteredLocation?.lng,
        address: address,
        country: country,
        state: state,
        county: county,
        city: city,
        imageRef: imageRef,
        date: Date.now(),
        petDateTime: petDateTimeString,
        phoneNumber: phoneNumber,
        userID: currentUser.email,
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

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));

      // give a unique name to the file
      var fileName = "image-" + Date.now();

      // Give reference to the bucket path where we require to store the uploaded image
      var storageRef = firebase.storage().ref('/images/' + fileName);

      // upload file to selected storage reference
      var uploadingElement = await storageRef.put(event.target.files[0]);
      const downloadURL = await getDownloadURL(storageRef);
      setImageRef(downloadURL);
      // uploadingElement.snapshot.ref.getDownloadURL().then(
        // function (imageURL) {
    }
  }
          
  const handleAddress = ({ address }: { address: string}) => {
    // Fetch and handle reverse geocoding data
  
    const myAPIKey = "d6b32867b992488091820bcca116a039";
    let searchGeocodingUrl = "https://api.geoapify.com/v1/geocode/search?text=" + address + "&format=json";
    searchGeocodingUrl += `&&apiKey=${myAPIKey}`;
  
    // call search Geocoding API - 
    fetch(searchGeocodingUrl)
      .then((response) => {
        if (!response.ok) {
          setAddressError(true);
        }
        return response.json();
      })
      .then((result) => {
        if (result.results.length > 0) {
          const lat = result.results[0].lat;
          const lng = result.results[0].lon;
          console.log(lat, lng);
          setAddressError (false);
          setEnteredLocation ({lat, lng});
          setAddress(result.results[0].formatted);
          setCountry(result.results[0]['country']);
          setState(result.results[0].state);
          setCounty(result.results[0].county);
          setCity(result.results[0].city);
        } else {
          setAddressError(true);
        }
      });
    };

  return (
    <Card sx={{ width: 500 }}>
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
          <h6>If you lost your pet, report pet as Lost. If you found a pet that was lost, report pet as Found.</h6>
        </div>
          <Box sx={{ ml: 1, mt: 2 }}>
            <FormControl>
              <FormLabel id="petStatus-label">Pet Status</FormLabel>
              <RadioGroup
                row
                onChange={(e) => setPetStatus(e.target.value)}
              >
                <FormControlLabel value="Lost" control={<Radio />} label="Lost" />
                <FormControlLabel value="Found" control={<Radio />} label="Found" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
          <FormControl>
              <FormLabel id="petDateTime-label" sx={{ ml: 1}}>Lost/Found: Date & Time</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Click to modify"
                  defaultValue={petDateTime}
                  onChange={(newValue) => setPetDateTime(newValue)}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          
          <Box>
          <FormLabel sx={{ ml: 1}}>Pet Information</FormLabel>
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
              <div style={{marginTop: "10px"}}>
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
              <p style={{marginTop: "-4px"}}></p>
              <FormLabel id="address-label">Enter Address</FormLabel>
              <TextField
                required
                fullWidth
                id="address"
                value={manualEntry}
                label="Address"
                onChange={(e) => {
                    setManualEntry (e.target.value);
                    handleAddress({address: e.target.value});
                }}
              />
              {addressError && (<h6 style={{color: "red"}}>Address not found</h6>)}
            </FormControl> 

            <FormLabel id="contact-label">Your Phone Number</FormLabel>
            <MuiTelInput
              fullWidth
              value={phoneNumber}
              defaultCountry="US"
              onChange={handlePhoneChange}
            />
          </Box>
          <Map onMapData={handleMapData} initial={enteredLocation}/>
          <p style={{marginTop:"-60px"}}></p>
          <h6>{address ? `Selected location: ${address}` : ``}</h6>     
          <Stack spacing={2} direction="row" mt={3} sx={{ ml: 1 }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" href='/posts'>Cancel</Button>
            <Button variant="contained" onClick={(e) => handleClick(e, "clicked")}>print data</Button>
            <Button variant="outlined" href='/edit-post'>Edit</Button>
          </Stack>

        </Box>
        </Box>
      </CardContent>
    </Card>
    )
}
