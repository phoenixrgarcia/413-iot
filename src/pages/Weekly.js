// src/pages/Weekly.js
import React from 'react';
import { useAppContext } from '../AppContext'; // Import the context
import { useMediaQuery } from '@mui/material';


function Weekly() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access global state
  const isMobile = useMediaQuery('(max-width:768px)'); // Check for mobile view

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state
  };

  return (
    <>

      <div>
        <h1>Welcome to the Weekly page</h1>
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

export default Weekly;
