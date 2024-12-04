import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

const DataVisualization = ({ data, xKey, yKey, title, xLabel, yLabel, color = "#8884d8" }) => {
  return (
    <div className="w-full h-96 bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey={xKey} 
            label={{ value: xLabel, position: 'bottom', fill: '#fff' }}
            tick={{ fill: '#fff' }}
          />
          <YAxis 
            label={{ value: yLabel, angle: -90, position: 'left', fill: '#fff' }}
            tick={{ fill: '#fff' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Line 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;