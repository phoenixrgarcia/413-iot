import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid2 } from '@mui/material';
import MedicalChart from '../components/MedicalChart';
import { fetchSensorData, fetchPatient } from '../frontend';
import { DevicesFoldTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Weekly() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [ avg, setAvg ] = useState(0);
  const [ min, setMin ] = useState(0);
  const [ max, setMax ] = useState(0);
  const [devices, setDevices] = useState([]);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();


  const calculateHeartRateStats = (data) => {
    if (!data || data.length === 0) {
      setAvg(0);
      setMin(0);
      setMax(0);
      return;
    }

    const heartRates = data.map(entry => entry.heartRate);
    setAvg((heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length).toFixed(2));
    setMin(Math.min(...heartRates));
    setMax(Math.max(...heartRates));
  };

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
        date.setDate(date.getDate() + 1);

        // Calculate the date 7 days before the selected date
        const past7DaysDate = new Date(date);
        past7DaysDate.setDate(date.getDate() - 6); // Include selected date

        // Filter data within the past 7 days
        const filteredData = data.filter((entry) => {
          const entryDate = new Date(entry.time);
          return entryDate >= past7DaysDate && entryDate <= date;
        });

        setWeeklyData(filteredData);
        calculateHeartRateStats(filteredData); // Calculate after data is set
      })
      .catch((error) => {
        console.error('Error loading the data:', error);
      });
  }, [devices, selectedDate]);  // Re-run when selectedDate changes


  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        Weekly View:
      </Typography>

      <Typography variant="h6" gutterBottom>Heart Rate Summary</Typography>

      <Typography variant="body1">
        <strong>Average Heart Rate:</strong> {avg} bpm
      </Typography>
      <Typography variant="body1">
        <strong>Minimum Heart Rate:</strong> {min} bpm
      </Typography>
      <Typography variant="body1">
        <strong>Maximum Heart Rate:</strong> {max} bpm
      </Typography>

      {weeklyData.length > 0
        ?
        <><MedicalChart data={weeklyData} dataKey="heartRate" Ylabel="Heart Rate (BPM)" stroke="#8884d8" />
          <MedicalChart data={weeklyData} dataKey="bloodOxygen" Ylabel="Oxygen Level (%)" stroke="#82ca9d" /> </>
        :
        <p>No data found for this date.</p>}
    </Container>
  );
}

export default Weekly;
