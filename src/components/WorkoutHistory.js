import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function WorkoutHistory() {
  const { user } = useAuth0(); // Get the logged-in user info from Auth0
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch workout history when component mounts
    const fetchWorkoutHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getWorkoutHistory/${user.email}`
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    if (user) {
      fetchWorkoutHistory();
    }
  }, [user]);

  return (
    <div>
      <h2>Your Workout History</h2>
      {workouts.length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <p>Type: {workout.workoutType}</p>
              <p>Duration: {workout.duration} minutes</p>
              <p>Calories Burned: {workout.caloriesBurned}</p>
              <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutHistory;
