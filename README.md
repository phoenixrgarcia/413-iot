413 Heart Monitoring Project
by William Rains, Ishan Adhikari, and Phoenix Garcia

Project Overview
The goal of this project was to create a fully functional Heart Monitoring System. Users can measure their heart rate and blood oxygen saturation using a physical device. The recorded data is sent to the Particle platform, which then triggers a webhook to send data to our MongoDB backend. The backend, built using Express, exposes multiple endpoints to interact with the data.

The project includes a user-friendly web application built using Node.js and React. Users can:

Sign in securely.
Access daily and weekly data.
Configure settings for their Particle device.
Add new devices.
Update their password.
File Hierarchy
Here is the high-level structure of the project files:

plaintext
Copy code
├── public/                  # Static files and mock data
│   └── resources/
│       └── dummy_data/      # Contains dummy JSON data for local testing
├── src/
│   ├── backend/             # Backend files
│   │   ├── server.js        # Express server
│   │   ├── models/          # Mongoose schemas
│   │   └── routes/          # API routes
│   ├── frontend/            # Frontend utilities and API calls
│   ├── components/          # React components
│   ├── pages/               # Application pages
│   └── App.js               # Main React app
├── package.json             # Project dependencies and scripts
└── README.md                # This file
Dependencies
To run the project, install the following dependencies using npm install:

bash
Copy code
├── @emotion/react@11.13.3
├── @emotion/styled@11.13.0
├── @mui/icons-material@6.1.5
├── @mui/lab@6.0.0-beta.17
├── @mui/material@6.1.9
├── @mui/x-date-pickers@7.23.0
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── bcrypt@5.1.1
├── concurrently@9.1.0
├── cors@2.8.5
├── d3-array@3.2.4
├── date-fns@4.1.0
├── express@4.21.1
├── jwt-simple@0.5.6
├── mongoose@8.8.3
├── mongosh@2.3.3
├── nodemon@3.1.7
├── react-dom@18.3.1
├── react-router-dom@6.27.0
├── react-scripts@5.0.1
├── react@18.3.1
├── recharts@2.14.1
└── web-vitals@2.1.4
Running the Project
Follow these steps to run the project locally:

Step 1: Install Dependencies
Run the following command to install all required dependencies:

bash
Copy code
npm install
Step 2: Run the Project
To launch the application, run:

bash
Copy code
npm run dev
concurrently will start:
MongoDB database (ensure mongod is in your PATH).
Express backend server.
React frontend.
MongoDB Setup
If you’re running the project locally for the first time:

Install MongoDB Community Server:
Follow this guide to install MongoDB:
MongoDB Local Setup Guide

Run MongoDB Locally:
Ensure the mongod command is available in your system's PATH. If you don’t want to run it using concurrently, you can start MongoDB separately:

bash
Copy code
mongod --dbpath ./data/db
Add Mock Data:
Upload the provided dummy data file from:

arduino
Copy code
public/resources/dummy_data/dummy_data.json
Import it into a MongoDB database named sensors.

Web Application Credentials
Use the following login credentials to access the application:

plaintext
Copy code
Email: demo@example.com
Password: password123
Links
Pitch Video: Watch on YouTube
Demo Video: (Link Placeholder)
Project Server: (Link Placeholder)
Contact
For any questions or collaboration, reach out to the contributors:

William Rains
Ishan Adhikari
Phoenix Garcia
Enjoy using the Heart Monitoring System! 🚀

