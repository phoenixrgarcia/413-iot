// This file is used as an API to call backend funcitons


export async function fetchRecords() {
    try {
      const response = await fetch("http://localhost:8080/patients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Records:", data);
      return data;
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  export async function fetchSingleRecord(id) {
    try {
      const response = await fetch(`http://localhost:8080/patients/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Record:", data);
      return data;
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  }

  export async function fetchSensorData(id) {
    try {
      const response = await fetch(`http://localhost:8080/data/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Record:", data);
      return data;
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  }
  

  export async function postPatient(email, password, deviceID) {
    try {
      const response = await fetch("http://localhost:8080/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // Change this to take a patient input 
            email: email,
            password: password,
            devices: deviceID,
          }),
  
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Test POST successful:", data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  
  export async function postDevice() {
    try {
      const response = await fetch("http://localhost:8080/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // Change this to take a device input 
            deviceId: "12345",
            activeRange: "01/12/2020",
            period: "1.6",
            APIKey: "WillysKey",
          }),
  
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Test POST successful:", data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }