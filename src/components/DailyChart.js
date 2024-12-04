import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

/**
 * Chart Component
 * @param {Object[]} data - Array of data objects to visualize
 * @example
 * [
 *   { time: '2024-12-01 10:00:00', heartRate: 75, bloodOxygen: 98.2 },
 *   { time: '2024-12-01 11:00:00', heartRate: 78, bloodOxygen: 97.9 },
 * ]
 */
const DailyChart = ({ data }) => {
  return (
    <LineChart
      width={800} // Adjust width to fit your layout
      height={400} // Adjust height for better visualization
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
    >
      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      <Line type="monotone" dataKey="bloodOxygen" stroke="#82ca9d" />
    </LineChart>
  );
};

export default DailyChart;
