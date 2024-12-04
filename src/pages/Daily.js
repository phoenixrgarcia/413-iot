import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid } from '@mui/material';
import DailyChart from '../components/DailyChart';

function Daily() {
  const [selectedDate, setSelectedDate] = useState('');
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public/resources folder
    fetch('/resources/dummy_data/dummy_data.json')
      .then((response) => response.json())
      .then((data) => {
        setDailyData(data);
      })
      .catch((error) => {
        console.error('Error loading the data:', error);
      });
  }, []);

  // Handle date change
  const handleDateChange = (event) => {
    const dateString = event.target.value; // Get date in YYYY-MM-DD format
    setSelectedDate(dateString);

    // Convert the string to a Date object
    const date = new Date(dateString);

    // Fetch data for the selected date from your backend or JSON file
    fetch(`/resources/heartRateData.json`)
      .then((response) => response.json())
      .then((data) => {
        // Filter data for the selected date (for demonstration purposes)
        const filteredData = data.filter((entry) => {
          const entryDate = new Date(entry.time).toLocaleDateString();
          const selectedDateStr = date.toLocaleDateString();
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
          
      {dailyData.length > 0 ? <DailyChart data={dailyData} /> : <p>Loading...</p>}
    </Container>
  );
}

export default Daily;
