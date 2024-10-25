import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Workout Statistics</h2>

      <div style={styles.chartContainer}>
        <h3 style={styles.subHeading}>Weekly Calories Burned</h3>
        <div style={styles.barChart}>
          <Bar data={getWeeklyCaloriesData()} options={chartOptions} />
        </div>
      </div>

      <div style={styles.chartContainer}>
        <h3 style={styles.subHeading}>Workout Type Distribution</h3>
        <div style={styles.pieChart}>
          <Pie data={getWorkoutTypeDistribution()} options={pieChartOptions} />
        </div>
      </div>

      <div style={styles.totalCalories}>
        <h3 style={styles.subHeading}>Total Calories Burned</h3>
        <p style={styles.caloriesText}>{totalCaloriesBurned} kcal</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
  },
  subHeading: {
    fontSize: '1.5rem',
    color: '#444',
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barChart: {
    width: '100%',
    height: '300px',
  },
  pieChart: {
    width: '400px',
    height: '400px',
  },
  totalCalories: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  caloriesText: {
    fontSize: '1.5rem',
    color: '#ff5733',
  },
};

export default WorkoutStats;
