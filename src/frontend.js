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

export async function fetchPatient(token) {
  try {
    const response = await fetch(`http://localhost:8080/patients/${token}`, {
      method: "GET",
      headers: { "X-Auth": token }
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
        deviceID: "12345",
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

export async function fetchDevice(deviceID){
  try {
    const response = await fetch(`http://localhost:8080/devices/${deviceID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json"}
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

export async function login(email, password) {
  const response = await fetch("http://localhost:8080/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add this header
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  });


  if (response.ok) {
    const tokenResponse = await response.json();
    localStorage.setItem("token",
      tokenResponse.token);
  }
}

export async function testys() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/status", {
    headers: { "X-Auth": token }
  });

  if (response.ok) {
    const users = await response.json();
    return users;
  }
}

export async function updatePatient(patientID, updatedData) {
    try {
      const response = await fetch(`http://localhost:8080/patients/${patientID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Dynamically send updated fields
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Patient updated successfully:", data);
      return data; // Return the updated data
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  }
  
