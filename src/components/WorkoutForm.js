import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function WorkoutForm() {
  const { user } = useAuth0(); // Get the logged-in user info from Auth0
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/saveWorkout", {
        userId: user.email, // Using user email as the identifier
        workoutType,
        duration: parseInt(duration), // Converting to integer
        caloriesBurned: parseInt(caloriesBurned), // Converting to integer
        date,
      });
      console.log(response.data);
      alert("Workout saved successfully!");
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("There was an error saving your workout. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Your Workout</h2>
      <div>
        <label>Workout Type</label>
        <input
          type="text"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          placeholder="e.g., Running, Cycling"
          required
        />
      </div>

      <div>
        <label>Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Calories Burned</label>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Save Workout</button>
    </form>
  );
}

export default WorkoutForm;
