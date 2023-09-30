import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Switch,
  FormGroup,
  Checkbox,
  FormControlLabel,
  CssBaseline
} from '@mui/material';
import { lightTheme, darkTheme } from '../themes';
import { useNavigate } from 'react-router-dom';
import { saveButtonStyle } from '../Settings';

function NotificationsPage() {

  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [notifications, setNotifications] = useState(() => {
    const storedValue = localStorage.getItem('notifications');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [smsCheck, setSmsChecked] = useState(() => {
    const storedValue = localStorage.getItem('smsCheck');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const [emailCheck, setEmailChecked] = useState(() => {
    const storedValue = localStorage.getItem('emailCheck');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const navigate = useNavigate();

  const handleSaveSettings = () => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('smsCheck', JSON.stringify(smsCheck));
    localStorage.setItem('emailCheck', JSON.stringify(emailCheck));
    navigate('/Settings');
  };
  useEffect(() => {
    window.addEventListener('beforeunload', handleSaveSettings);
    return () => {
      window.removeEventListener('beforeunload', handleSaveSettings);
    };
  }, [darkMode, notifications, smsCheck, emailCheck]);

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    if (!notifications) {
      setSmsChecked(false);
      setEmailChecked(false);
    }
  };

  const handleSmsChange = () => {
    setSmsChecked(!smsCheck);
  };

  const handleEmailChange = () => {
    setEmailChecked(!emailCheck);
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
              Notification Settings
            </Typography>
          </Paper>
        </Container>
        <Container>
          <Paper elevation={3} style={{ ...saveButtonStyle, padding: '20px', marginTop: '20px'}}>
            <Typography variant="h5">App Notifications</Typography>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={handleNotificationsToggle}
                      name="notifications"
                    />
                  }
                  label="Notifications"
                />
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={smsCheck && notifications}
                        onChange={handleSmsChange}
                        disabled={!notifications}
                        name="sms"
                      />
                    }
                    label="Enable SMS Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emailCheck && notifications}
                        onChange={handleEmailChange}
                        disabled={!notifications}
                        name="email"
                      />
                    }
                    label="Enable Email Notifications"
                  />
                </FormGroup>
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

export default NotificationsPage;
