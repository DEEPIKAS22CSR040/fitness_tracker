import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchExercises } from '../api/exerciseApi';
import { useAuth0 } from '@auth0/auth0-react';
import './WorkoutForm.css'; // Import the CSS file

const WorkoutForm = () => {
  const { user } = useAuth0();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

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
    
    const userId = user.email;

    try {
      const response = await axios.post('http://localhost:5000/saveWorkout', {
        userId,
        workoutType: selectedExercise,
        duration,
        caloriesBurned,
      });

      console.log('Workout logged successfully:', response.data);
      setMessage('Workout logged successfully!');
    } catch (error) {
      console.error('Error logging workout:', error);
      setMessage('Error logging workout. Please try again.');
    }
  };

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Select Exercise:
        <select 
          className="form-select"
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

      <label className="form-label">
        Duration (minutes):
        <input 
          className="form-input"
          type="number" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
        />
      </label>

      <label className="form-label">
        Calories Burned:
        <input 
          className="form-input"
          type="number" 
          value={caloriesBurned} 
          onChange={(e) => setCaloriesBurned(e.target.value)} 
        />
      </label>

      <button className="form-button" type="submit">Log Workout</button>
      {message && <div className="form-message">{message}</div>}
    </form>
  );
};

export default WorkoutForm;
