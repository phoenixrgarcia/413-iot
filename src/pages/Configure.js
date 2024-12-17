import React, { useEffect, useState } from "react";
import { fetchPatient } from "../frontend";

const Configure = () => {

  const [devices, setDevices] = useState([]);

  // State for selected device and its config
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [samplingFrequency, setSamplingFrequency] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchPatient(localStorage.getItem('token'));
  }, []);

  // Handle device selection
  const handleDeviceChange = (event) => {
    const deviceId = parseInt(event.target.value, 10);
    const device = devices.find((dev) => dev.id === deviceId);
    setSelectedDevice(device);
    setSamplingFrequency(device.config.samplingFrequency);
    setStartTime(device.config.startTime);
    setEndTime(device.config.endTime);
  };

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
              {device.name}
            </option>
          ))}
        </select>
      </label>

      {selectedDevice && (
        <div style={{ marginTop: "20px" }}>
          <h3>Configuration for {selectedDevice.name}</h3>

          {/* Sampling Frequency */}
          <div>
            <label>
              Sampling Frequency (minutes):
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
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              End Time:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>

          {/* Save Button */}
          <div>
            <button>Save Configuration</button>
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
