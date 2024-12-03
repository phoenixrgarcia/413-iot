// src/components/Heading.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext'; // Import the context

function Heading() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access context
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out
      navigate('/'); // Redirect to home
    } else {
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <MonitorHeartIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Heart Monitor
        </Typography>

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/configure">Configure</Button>
          <Button color="inherit" component={Link} to="/daily">Daily</Button>
          <Button color="inherit" component={Link} to="/weekly">Weekly</Button>
          <Button color="inherit" component={Link} to="/reference">Reference</Button>
        </Box>

        {/* Login/Logout Button */}
        <Button color="inherit" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Log out' : 'Log in'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Heading;
