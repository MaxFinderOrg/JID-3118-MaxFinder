import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  Container,
  Paper,
  Button,
  Select,
  MenuItem,
  FormGroup,
  FormControl,
  SelectChangeEvent,
  Grid,
  TextField,
  Slider,
  CssBaseline
} from '@mui/material';
import { lightTheme, darkTheme } from './themes';
import { useNavigate } from 'react-router-dom';
  
export const gridStyle = {
  backgroundColor: '#808080',
  padding: '10px',
};

export const saveButtonStyle = {
  backgroundColor: '#808080',
  color: 'white',
};

function SettingsPage() {  
    
  // Initialize settings with default values or retrieve them from local storage
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [notifications, setNotifications] = useState(() => {
    const storedValue = localStorage.getItem('notifications');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const [language, setLanguage] = useState(() => {
    const storedValue = localStorage.getItem('language');
    return storedValue || 'en';
  });

  const [volume, setVolume] = useState(() => {
    const storedValue = localStorage.getItem('volume');
    return storedValue ? JSON.parse(storedValue) : 50;
  });

  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Function to handle the "Save Settings" button click
  const handleSaveSettings = () => {
    // Save the settings to your state management or storage
    // For example, you can use localStorage:
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('language', language);
    localStorage.setItem('volume', JSON.stringify(volume));

    // Navigate to another page (e.g., the homepage)
    navigate('/Profile'); // Replace '/' with the URL of the page you want to navigate to
  };

  // Function to handle navigation to the "Notifications" page
  const handleNotificationsClick = () => {
    navigate('/notifications'); // Replace '/notifications' with the URL of your "Notifications" page
  };
  const handleDisplayClick = () => {
    navigate('/display'); // Replace '/notifications' with the URL of your "Notifications" page
  };
  const handleEditUserClick = () => {
    navigate('/editUser'); // Replace '/notifications' with the URL of your "Notifications" page
  };

  useEffect(() => {
    // Add event listener to handle navigation away from the page
    window.addEventListener('beforeunload', handleSaveSettings);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleSaveSettings);
    };
  }, [darkMode, notifications, language, volume]);

  // Function to handle notifications toggle
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  // Function to handle language change
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  // Function to handle volume change
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{
              backgroundColor: '#333', // Customize the background color
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h4" style={{ color: 'white' }}>
              Settings
            </Typography>
          </Paper>
        </Container>
        <Container>
          <Paper elevation={3} style={{...saveButtonStyle, padding: '20px', marginTop: '20px'}}>
            <Typography variant="h5">Language Settings</Typography>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <Select
                label="Language"
                value={language}
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Paper elevation={3} style={{...saveButtonStyle, padding: '20px', marginTop: '20px'}}>
            <Typography variant="h5">Audio Settings</Typography>
            <FormGroup>
              <Typography id="volume-slider" gutterBottom>
                Volume
              </Typography>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
            </FormGroup>
          </Paper>
          <Container>
            <Button
              variant="contained"
              onClick={handleDisplayClick}
              style={{ ...saveButtonStyle, marginTop: '30px' }}
              fullWidth
            >
              Display Settings
            </Button>
          </Container>
          <Container>
            <Button
              variant="contained"
              onClick={handleNotificationsClick}
              style={{ ...saveButtonStyle, marginTop: '30px' }}
              fullWidth
            >
              Notifications
            </Button>
          </Container>
          <Container>
            <Button
              variant="contained"
              onClick={handleEditUserClick}
              style={{ ...saveButtonStyle, marginTop: '30px'}}
              fullWidth
            >
              Edit User
            </Button>
          </Container>
          <Container>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveSettings}
              style={{ marginTop: '20px', marginBottom: '20px', padding:'30px' }}
              fullWidth
            >
              Save Settings
            </Button>
          </Container>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default SettingsPage;
