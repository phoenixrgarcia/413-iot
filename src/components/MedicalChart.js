import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Scatter, Label, ReferenceLine, ReferenceDot } from 'recharts';
import { format } from 'date-fns';
import { min, max } from 'd3-array'; 


const MedicalChart = ({ data, dataKey, Ylabel, stroke }) => {
  const minValue = min(data, (d) => d[dataKey]);
  const maxValue = max(data, (d) => d[dataKey]);

  const minPoint = data.find((d) => d[dataKey] === minValue);
  const maxPoint = data.find((d) => d[dataKey] === maxValue);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis
            dataKey="time"
            tickFormatter={(time) => format(new Date(time), 'MM-dd HH:mm')}
            tick={{ fontSize: 12 }}
            label={{
              value: "Time (MM-DD HH:MM)",
              position: "bottom",
              offset: -10,  // Adjust label position
              style: { fontSize: 14, fontWeight: 'bold' }
            }}
          />
          <YAxis tick={{ fontSize: 12 }} padding={{ top: 30 }} label={{
            value: Ylabel ,
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 14, fontWeight: 'bold' }
          }} />
          <Tooltip
            labelFormatter={(time) => format(new Date(time), 'PPpp')}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} />

          {/* Min Point ReferenceDot */}
          <ReferenceDot
            x={minPoint?.time}
            y={minValue}
            r={5}
            fill="#ff0000"
            label={{
              value: `Min: ${minValue}`,
              position: 'top',
              fill: '#ff0000',
              fontSize: 12,
            }}
          />

          {/* Max Point ReferenceDot */}
          <ReferenceDot
            x={maxPoint?.time}
            y={maxValue}
            r={5}
            fill="#228B22"
            label={{
              value: `Max: ${maxValue}`,
              position: 'top',
              fill: '#228B22',
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicalChart;
