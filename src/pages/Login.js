// src/pages/Login.js
import React, { useState } from 'react';
import { useAppContext } from '../AppContext'; // Import the context
import { Container, Typography, Box, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { login } from '../frontend';

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add token authentication, password salting, and encryption logic here

    login(email, password);
    setIsLoggedIn(localStorage.getItem('token') != null);
    navigate('/'); // Redirect to home
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Log In
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>

        {/* Create Account Button */}
        <Button
          variant="text"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => navigate('/create-account')} // Navigate to the CreateAccount page
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
