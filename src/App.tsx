import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavigationBar from './components/NavBar/NavBar';
import { Container } from '@mui/material';
import Router1 from './router';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />

          <Router1 />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;