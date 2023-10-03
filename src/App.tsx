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
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
         >
          <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router1 />
          </div>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;