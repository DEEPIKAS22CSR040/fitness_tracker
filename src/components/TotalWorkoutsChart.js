import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TotalWorkoutsChart = ({ workoutData }) => {
  // Prepare data for the chart
  const data = workoutData.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    totalWorkouts: item.totalWorkouts,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalWorkouts" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TotalWorkoutsChart;
