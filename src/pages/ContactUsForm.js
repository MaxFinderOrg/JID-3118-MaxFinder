import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { dbb } from '../firebase'; // Import the Firestore instance

const ContactUsForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store data in Firebase Firestore
      await dbb.collection('contactUs').add({
        email: email,
        message: message,
        timestamp: new Date(),
      });

      // Optionally, you can reset the form
      setEmail('');
      setMessage('');

      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth // Make the email field full-width
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth // Make the message field full-width
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ContactUsForm;
