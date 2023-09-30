import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  TextField,
  CssBaseline
} from '@mui/material';
import { lightTheme, darkTheme } from '../themes';
import { useNavigate } from 'react-router-dom';
import { gridStyle } from '../Settings';

function EditUserPage() {

  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [email, setEmail] = useState(() => {
    const storedValue = localStorage.getItem('email');
    return storedValue || 'email';
  });

  const navigate = useNavigate();

  const handleSaveSettings = () => {
    localStorage.setItem('email', email);
    navigate('/Settings');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleSaveSettings);
    return () => {
      window.removeEventListener('beforeunload', handleSaveSettings);
    };
  }, [email]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
                User Settings
              </Typography>
            </Paper>
          </Container>
          <Container>
            <Grid item xs={12} style={gridStyle}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
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

export default EditUserPage;
