// src/components/Heading.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Menu, MenuItem, IconButton } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext'; // Import the context
import MenuIcon from '@mui/icons-material/Menu';

function Heading() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access context
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)'); // Check for mobile view
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  // Handle opening and closing of menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out
      localStorage.removeItem("token");
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

        {/* Mobile Menu Button */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem component={Link} to="/configure" onClick={handleMenuClose}>Configure</MenuItem>
              <MenuItem component={Link} to="/daily" onClick={handleMenuClose}>Daily</MenuItem>
              <MenuItem component={Link} to="/weekly" onClick={handleMenuClose}>Weekly</MenuItem>
              <MenuItem component={Link} to="/reference" onClick={handleMenuClose}>Reference</MenuItem>
            </Menu>
          </>
        ) : (
          // Desktop Navigation Buttons
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to={isLoggedIn? "/configure" : "/login"}>Configure</Button>
            <Button color="inherit" component={Link} to={isLoggedIn? "/daily" : "/login"}>Daily</Button>
            <Button color="inherit" component={Link} to={isLoggedIn? "/weekly" : "login"}>Weekly</Button>
            <Button color="inherit" component={Link} to="/reference">Reference</Button>
          </Box>
        )}

        {/* Login/Logout Button */}
        <Button color="inherit" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Log out' : 'Log in'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Heading;
