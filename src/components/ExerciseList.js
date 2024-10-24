// src/components/ExerciseList.js
import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../api/exerciseApi'; // Adjust the path if necessary

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises();
        setExercises(data);
      } catch (error) {
        setError('Failed to load exercises');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Exercises</h2>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
            {exercise.image && <img src={exercise.image} alt={exercise.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
