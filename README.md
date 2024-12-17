# 413 Heart Monitoring Project  
**by William Rains, Ishan Adhikari, and Phoenix Garcia**

---

## **Project Overview**  
The goal of this project was to create a fully functional **Heart Monitoring System**. Users can measure their **heart rate** and **blood oxygen saturation** using a physical device. The recorded data is sent to the **Particle platform**, which then triggers a **webhook** to send data to our MongoDB backend. The backend, built using **Express**, exposes multiple endpoints to interact with the data.  

The project includes a user-friendly **web application** built using **Node.js** and **React**. Users can:  
- Sign in securely.  
- Access **daily** and **weekly** data.  
- Configure settings for their Particle device.  
- Add new devices.  
- Update their password.  

---

## **File Hierarchy**  
Here is the high-level structure of the project files:

```plaintext
├── public/                  # Static files and mock data
│   └── resources/
│       └── dummy_data/      # Contains dummy JSON data for local testing
├── src/
│   ├── backend/             # Backend files
│   │   ├── db/
|   |   |   ├── db.js        # Database Connection File
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes.js        # API routes for our express backend
|   |   └── server.js        # Launches our server
│   ├── components/          # React components we reuse for modularity
│   ├── pages/               # Different pages used in our application
│   ├── frontend.js/         # Fetch requests to backend endpoints.
│   └── App.js               # Main React app
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

---

### **Authentication Endpoints**

1. **`POST /auth`**  
   - **Purpose**: Authenticate a user with their email and password.
   - **Request**: Requires `email` and `password` in the body.  
   - **Response**: Returns a JWT token if successful. If the email or password is incorrect, it returns a `401 Unauthorized`.

2. **`GET /status`**  
   - **Purpose**: Fetch all patient records for authenticated users.  
   - **Request**: Requires the `X-Auth` header containing a valid JWT token.  
   - **Response**: Returns a list of patients. If the token is invalid, returns `401 Unauthorized`.

### **Patient Endpoints**

3. **`POST /patients`**  
   - **Purpose**: Add a new patient with a hashed password.  
   - **Request**:  
     - `email`: The patient’s email.  
     - `password`: Plain-text password (hashed before saving).  
     - `devices`: Optional array of device IDs.  
   - **Response**: Returns the created patient object.

4. **`GET /patients`**  
   - **Purpose**: Fetch all patient records.  
   - **Response**: Returns a list of all patients.

5. **`GET /patients/:email`**  
   - **Purpose**: Fetch a specific patient’s details using their email.  
   - **Request**: Requires `X-Auth` header containing a valid JWT token.  
   - **Response**: Returns the patient’s details if found.

6. **`PUT /patients/:email`**  
   - **Purpose**: Update a specific patient’s information.  
   - **Request**:  
     - Optional fields to update: `password` (hashed), `devices`.  
   - **Response**: Returns the updated patient object. Returns `404` if the patient is not found.

### **Device Endpoints**

7. **`POST /devices`**  
   - **Purpose**: Add a new device with its configuration settings.  
   - **Request**:  
     - `deviceId`: Unique ID for the device.  
     - `frequencyMeasured`, `startHours`, `startMinutes`, `endHours`, `endMinutes`: Device configuration details.  
   - **Response**: Returns the created device object.

8. **`GET /devices/:id`**  
   - **Purpose**: Fetch a specific device’s configuration using its `deviceId`.  
   - **Request**: Device ID as a route parameter.  
   - **Response**: Returns the device’s configuration details. If not found, returns `404`.

9. **`PUT /devices/:id`**  
   - **Purpose**: Update the configuration of a specific device.  
   - **Request**:  
     - Fields to update: `frequencyMeasured`, `startHours`, `startMinutes`, `endHours`, `endMinutes`.  
   - **Response**: Returns the updated device object.

### **Sensor Data Endpoints**

10. **`POST /data`**  
    - **Purpose**: Add new sensor data to the database.  
    - **Request**:  
      - `deviceID`: The ID of the device sending the data.  
      - `oxygenLevel`, `heartRate`, `dateTime`: Sensor readings and timestamp.  
    - **Response**: Returns the created sensor data object.

11. **`GET /data/:id`**  
    - **Purpose**: Fetch all sensor data for a specific device.  
    - **Request**: Device ID as a route parameter.  
    - **Response**: Returns all sensor data entries for the device.

---



## **Dependencies**  
To run the project, install the following dependencies using `npm install`:

```bash
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
```

---

## **Running the Project**  
Follow these steps to run the project locally:

### **Step 1: Install Dependencies**  
Run the following command to install all required dependencies:  
```bash
npm install
```

### **Step 2: Run the Project**  
To launch the application, run:  
```bash
npm run dev
```
- **`concurrently`** will start:  
   - MongoDB database (ensure `mongod` is in your PATH).  
   - Express backend server.  
   - React frontend.  

---

### **MongoDB Setup**  
If you’re running the project locally for the first time:  

1. **Install MongoDB Community Server**:  
   Follow this guide to install MongoDB:  
   [MongoDB Local Setup Guide](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database)

2. **Run MongoDB Locally**:  
   Ensure the `mongod` command is available in your system's PATH. If you don’t want to run it using `concurrently`, you can start MongoDB separately:  
   ```bash
   mongod --dbpath ./data/db
   ```

3. **Add Mock Data**:  
   Upload the provided dummy data file from:  
   ```
   public/resources/dummy_data/dummy_data.json
   ```
   Import it into a MongoDB database named `sensors`.

---

## **Links**  

- **Pitch Video**: [Watch on YouTube](https://www.youtube.com/watch?v=LV28VCgQyi0)  
- **Demo Video**: (Link Placeholder)  

---

## **Contact**  
For any questions or collaboration, reach out to the contributors:  
- **William Rains**  
- **Ishan Adhikari**  
- **Phoenix Garcia**  

---

Enjoy using the **Heart Monitoring System**!  
