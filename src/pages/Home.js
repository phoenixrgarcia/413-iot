// src/pages/Home.js
import React from 'react';
import { useAppContext } from '..AppContext'; // Import the context
import { useMediaQuery } from '@mui/material';

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access global state
  const isMobile = useMediaQuery('(max-width:768px)'); // Check for mobile view

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state
  };

  return (
    <>
      <Heading /> {/* Include the Heading component */}

      <div>
        <h1>Welcome to the Heart Monitor App</h1>
        <p>Your health data at a glance.</p>
        
        {/* Display login status */}
        <div>
          {isLoggedIn ? (
            <p>You are logged in.</p>
          ) : (
            <p>You are logged out.</p>
          )}
        </div>

        {/* Button to toggle login/logout */}
        <button onClick={handleLoginLogout}>
          {isLoggedIn ? 'Log out' : 'Log in'}
        </button>

        {/* Responsive design message */}
        {isMobile && <p>You are viewing this on a mobile device.</p>}
      </div>
    </>
  );
}

export default Home;
