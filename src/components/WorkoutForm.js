import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { fetchExercises } from '../api/exerciseApi';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook

const WorkoutForm = () => {
  const { user } = useAuth0(); // Get user information
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // For success/error messages

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises();
        setExercises(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
        setError('Failed to load exercises. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = user.email; // Using user's email as unique ID

    try {
      const response = await axios.post('http://localhost:5000/saveWorkout', {
        userId,
        workoutType: selectedExercise,
        duration,
        caloriesBurned,
      });

      console.log('Workout logged successfully:', response.data);
      setMessage('Workout logged successfully!'); // Display success message
    } catch (error) {
      console.error('Error logging workout:', error);
      setMessage('Error logging workout. Please try again.'); // Display error message
    }
  };

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Exercise:
        <select 
          value={selectedExercise} 
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="">Select an exercise</option>
          {exercises.map(exercise => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Duration (minutes):
        <input 
          type="number" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
        />
      </label>
      <label>
        Calories Burned:
        <input 
          type="number" 
          value={caloriesBurned} 
          onChange={(e) => setCaloriesBurned(e.target.value)} 
        />
      </label>
      <button type="submit">Log Workout</button>
      {message && <div>{message}</div>} {/* Display message to user */}
    </form>
  );
};

export default WorkoutForm;
