// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Heading from './components/Heading';
import Home from './pages/Home';
import Configure from './pages/Configure';
import Daily from './pages/Daily';
import Weekly from './pages/Weekly';
import Reference from './pages/Reference';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount.js';
import { AppProvider } from './AppContext'; // Import AppProvider from AppContext


function App() {
  return (
    <AppProvider> {/* Wrap the Router in AppProvider */}
      <Router>
        <Heading /> {/* Render the Heading component */}
        
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/create-account" element={<CreateAccount />} /> 
          <Route path="/configure" element={<Configure />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/reference" element={<Reference />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
