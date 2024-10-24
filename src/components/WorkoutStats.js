import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // Required for bar chart x-axis
  LinearScale,
  BarElement,
  ArcElement, // Required for pie chart
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function WorkoutStats() {
  const { user } = useAuth0();
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workouts/${user.email}`);
        setWorkoutData(response.data);
      } catch (error) {
        console.error("Error fetching workout data", error);
      }
    };
    fetchWorkoutData();
  }, [user.email]);

  const getWeeklyCaloriesData = () => {
    const weeklyCalories = {};
    workoutData.forEach(workout => {
      const week = new Date(workout.date).toLocaleString("en-US", { week: "numeric", year: "numeric" });
      if (!weeklyCalories[week]) weeklyCalories[week] = 0;
      weeklyCalories[week] += workout.caloriesBurned;
    });

    const labels = Object.keys(weeklyCalories);
    const data = Object.values(weeklyCalories);

    return {
      labels,
      datasets: [
        {
          label: "Calories Burned",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data,
        },
      ],
    };
  };

  const getWorkoutTypeDistribution = () => {
    const workoutTypeCount = {};
    workoutData.forEach(workout => {
      if (!workoutTypeCount[workout.workoutType]) workoutTypeCount[workout.workoutType] = 0;
      workoutTypeCount[workout.workoutType] += 1;
    });

    const labels = Object.keys(workoutTypeCount);
    const data = Object.values(workoutTypeCount);

    return {
      labels,
      datasets: [
        {
          label: "Workout Type",
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          data,
        },
      ],
    };
  };

  const totalCaloriesBurned = workoutData.reduce((total, workout) => total + workout.caloriesBurned, 0);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: { display: true },
      y: { display: true, beginAtZero: true },
    },
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: true, position: "right" },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>Workout Statistics</h2>

      <div style={{ width: "500px", height: "300px" }}>
        <h3>Weekly Calories Burned</h3>
        <Bar data={getWeeklyCaloriesData()} options={chartOptions} />
      </div>

      <div style={{ width: "400px", height: "400px" }}>
        <h3>Workout Type Distribution</h3>
        <Pie data={getWorkoutTypeDistribution()} options={pieChartOptions} />
      </div>

      <div>
        <h3>Total Calories Burned</h3>
        <p>{totalCaloriesBurned} kcal</p>
      </div>
    </div>
  );
}

export default WorkoutStats;
