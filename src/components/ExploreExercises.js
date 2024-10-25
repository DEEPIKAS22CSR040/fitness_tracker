import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../api/exerciseApi';
import './ExploreExercises.css';

const ExploreExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Explore Exercises</h2>
      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <img src={exercise.gifUrl} alt={exercise.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreExercises;
