import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './router';
import NavigationBar from './components/NavBar/NavBar';
import { Container } from '@mui/material';

function App() {
  return (
      <BrowserRouter>
        <NavigationBar />
        <Container>
          <Router />
        </Container>
      </BrowserRouter>
  );
}

export default App;
