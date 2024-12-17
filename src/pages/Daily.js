import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid } from '@mui/material';
import MedicalChart from '../components/MedicalChart';
import { fetchSensorData, fetchPatient } from '../frontend';
import { useAppContext } from '../AppContext'; // Import the context
import { useNavigate } from 'react-router-dom';

function Daily() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Access context
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState([]);

  const [devices, setDevices] = useState([]);
  const [patient, setPatient] = useState(null);
  

  useEffect(() => {
    if (localStorage.getItem('token') == null){
      navigate('/login');
    }
    async function fetchData() {
        const token = localStorage.getItem('token');
        const patientData = await fetchPatient(token);
        setPatient(patientData); // Set the patient data

        if (patientData && patientData.devices) {
            setDevices(patientData.devices); // Set devices only after patientData is fetched
        }
    }

    fetchData(); // Call the async function
}, []); // Empty dependency array ensures it runs only on mount



  useEffect(() => {
    // Fetch the JSON file from the public/resources folder
    fetchSensorData(devices.at(0))//  TODO: Change to Patient ID
      .then((data) => {
        const date = new Date(selectedDate);
        const filteredData = data.filter((entry) => {
          const entryDate = new Date(entry.time).toISOString().split('T')[0];
          const selectedDateStr = date.toISOString().split('T')[0];
          return entryDate === selectedDateStr;
        });
        setDailyData(filteredData);
      })
      .catch((error) => {
        console.error('Error loading the data:', error);
      });
  }, [devices, selectedDate]);

  // Handle date change
  const handleDateChange = (event) => {
    const dateString = event.target.value; // Get date in YYYY-MM-DD format
    setSelectedDate(dateString);

    // Convert the string to a Date object
    const date = new Date(dateString);

    // Fetch data for the selected date from your backend or JSON file
    fetchSensorData(devices.at(0))
      .then((data) => {
        // Filter data for the selected date (for demonstration purposes)
        const filteredData = data.filter((entry) => {
          const entryDate = new Date(entry.time).toISOString().split('T')[0];
          const selectedDateStr = date.toISOString().split('T')[0];
          return entryDate === selectedDateStr;
        });
        setDailyData(filteredData);
      })
      .catch((error) => console.error('Error loading the data:', error));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        Daily View:
      </Typography>

      {/* Date Picker as TextField */}
      <TextField
        label="Date"
        name="date"
        type="date"
        value={selectedDate} // Use string format 'YYYY-MM-DD'
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true, // Ensure label stays above the input field
        }}
      />

      {dailyData.length > 0
        ?
        <><MedicalChart data={dailyData} dataKey="heartRate" Ylabel="Heart Rate (BPM)" stroke="#8884d8" />
          <MedicalChart data={dailyData} dataKey="bloodOxygen" Ylabel="Oxygen Level (%)" stroke="#82ca9d" /> </>
        :
        <p>No data found for this date.</p>}
    </Container>
  );
}

export default Daily;
