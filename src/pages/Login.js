// src/pages/Login.js
import React from 'react';
import { useAppContext } from '../AppContext'; // Import the context
import { useMediaQuery, Container, Typography, Grid2, Card, CardMedia, CardContent, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add token authentication, password salting, and encryption logic here
      console.log('Email:', email);
      console.log('Password:', password);
      // Call your MongoDB API endpoint here
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
        </Box>
      </Container>
    );
  };

export default Login;