import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import './WorkoutHistory.css'; // Import the CSS file

function WorkoutHistory() {
  const { user } = useAuth0();
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/workouts/${user.email}`
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workout history:", error);
        setError("Failed to fetch workout history. Please try again later.");
      }
    };

    if (user && user.email) {
      fetchWorkoutHistory();
    }
  }, [user]);

  return (
    <div className="workout-history">
      <h2>Your Workout History</h2>
      {error && <p className="error-message">{error}</p>}
      {workouts.length === 0 ? (
        <p className="no-workouts">No workouts logged yet.</p>
      ) : (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout._id} className="workout-item">
              <p><strong>Type:</strong> {workout.workoutType}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
              <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutHistory;
