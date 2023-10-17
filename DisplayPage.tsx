import React, { useState, useEffect } from 'react';
import { ThemeProvider} from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  CssBaseline
} from '@mui/material';
import { saveButtonStyle } from '../Settings';

function DisplayPage() {
    
  // Initialize settings with default values or retrieve them from local storage
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Function to handle the "Save Settings" button click
  const handleSaveSettings = () => {
    // Save the settings to your state management or storage
    // For example, you can use localStorage:
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Navigate to another page
    navigate('/Settings');
  };

  useEffect(() => {
    // Add event listener to handle navigation away from the page
    window.addEventListener('beforeunload', handleSaveSettings);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleSaveSettings);
    };
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{
              backgroundColor: '#333',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h4" style={{ color: 'white' }}>
              Display Settings
            </Typography>
          </Paper>
        </Container>
        <Container>
          <Paper elevation={3} style={{ ...saveButtonStyle, padding: '20px', marginTop: '20px'}}>
            <Typography variant="h5">Dark Mode</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                       name="darkMode"
                    />
                  }
                  label="Dark Mode"
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
            style={{ marginTop: '20px' }}
          >
            Save Settings
          </Button>
        </Container>
      </div>
    </ThemeProvider>

    
  );
}

export default DisplayPage;
