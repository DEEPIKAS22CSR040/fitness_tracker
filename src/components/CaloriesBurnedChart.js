import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CaloriesBurnedChart = ({ workoutData }) => {
  const data = workoutData.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    caloriesBurned: item.caloriesBurned,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="caloriesBurned" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CaloriesBurnedChart;
