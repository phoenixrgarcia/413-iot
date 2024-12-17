import React, { useEffect, useState } from "react";
import { fetchDevice, fetchPatient, updateDevice } from "../frontend";

const Configure = () => {

  const [devices, setDevices] = useState([]);
  const [patient, setPatient] = useState(null);

  // State for selected device and its config
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [samplingFrequency, setSamplingFrequency] = useState('');
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const patientData = await fetchPatient(token);
      setPatient(patientData); // Set the patient data

      console.log(patientData.devices);
      if (patientData && patientData.devices) {
        setDevices(patientData.devices); // Set devices only after patientData is fetched
      }
    }

    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures it runs only on mount

  useEffect(() => {
    console.log("Device:", selectedDevice);
    if (selectedDevice) {
      setSamplingFrequency(selectedDevice.frequencyMeasured);
      setStartHour(selectedDevice.startHours);
      setStartMinute(selectedDevice.startMinutes);
      setEndHour(selectedDevice.endHours);
      setEndMinute(selectedDevice.endMinutes);
    }
  }, [selectedDevice]);

  // Handle device selection
  const handleDeviceChange = async (event) => {
    const device = await fetchDevice(event.target.value);
    setSelectedDevice(device); // Update the state after fetching the device
  };

  const handleSaveDevice = async () =>{
    const updatedData = {
      frequencyMeasured: samplingFrequency,
      startHours: startHour,
      startMinutes: startMinute,
      endHours: endHour,
      endMinutes: endMinute,
    };
    
    updateDevice(selectedDevice.deviceId, updatedData);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Configure Device</h2>

      {/* Device Dropdown */}
      <label>
        Select Device:
        <select onChange={handleDeviceChange} defaultValue="">
          <option value="" disabled>Select a device</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device}
            </option>
          ))}
        </select>
      </label>

      {selectedDevice && (
        <div style={{ marginTop: "20px" }}>
          <h3>Configuration for {selectedDevice.deviceId}</h3>

          {/* Sampling Frequency */}
          <div>
            <label>
              Sampling Frequency (microseconds):
              <input
                type="number"
                value={samplingFrequency}
                onChange={(e) => setSamplingFrequency(e.target.value)}
              />
            </label>
          </div>

          {/* Time Range */}
          <div>
            <label>
              Start Hour:
              <input
                type="number"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
            </label>
          </div><div>
            <label>
              Start Minute:
              <input
                type="number"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              End Hour:
              <input
                type="number"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              End Minute:
              <input
                type="number"
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
              />
            </label>
          </div>

          {/* Save Button */}
          <div>
            <button onClick={handleSaveDevice}>Save Configuration</button>
            <button>Remove Device</button>
          </div>
        </div>
      )}


      <h3 style={{ marginTop: "20px" }}>Add New Device</h3>

      {/* New Device ID */}
      <div>
        <label>
          New Device ID:
          <input type="text" />
        </label>
      </div>

      {/* Add Device Button */}
      <div>
        <button>Add Device</button>
      </div>

      <h3>Account Configuration</h3>

      {/* Username (disabled) */}
      <div>
        <label>
          Email:
          <input type="text" value="currentEmail" disabled />
        </label>
      </div>

      {/* Current Password */}
      <div>
        <label>
          Current Password:
          <input type="password" />
        </label>
      </div>

      {/* New Password */}
      <div>
        <label>
          New Password:
          <input type="password" />
        </label>
      </div>

      {/* Save Button */}
      <div>
        <button>Submit Changes</button>
      </div>


    </div>
  );
};

export default Configure;
