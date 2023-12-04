import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { dbb } from '../firebase';

const Adopt = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [petPreference, setPetPreference] = useState(''); // New state for pet preference
  const [isAdult, setIsAdult] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      // Check if the user is at least 18 years old
      if (!isAdult) {
        console.error('You must be at least 18 years old to adopt a pet.');
        return;
      }

      // Store adoption request data in Firebase Firestore
      await dbb.collection('adoptionRequests').add({
        name: name,
        contactNumber: contactNumber,
        address: address,
        petPreference: petPreference, // Include pet preference in the data
        timestamp: new Date(),
      });

      // Optionally, you can reset the form
      setName('');
      setContactNumber('');
      setAddress('');
      setPetPreference('');
      setIsAdult(false);

      console.log('Adoption request submitted successfully!');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <p></p>
      <p></p>
      <h2>Adoption Request</h2>
      <p></p>
      <h6>User must wait 48 hours to start adoption application to confirm if owner claims lost pet</h6>
      <p></p>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Contact Number"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Address"
            multiline
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Pet to Adopt"
            value={petPreference}
            onChange={(e) => setPetPreference(e.target.value)}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdult}
                onChange={() => setIsAdult(!isAdult)}
                color="primary"
              />
            }
            label="I am at least 18 years old."
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit Adoption Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Adopt;
