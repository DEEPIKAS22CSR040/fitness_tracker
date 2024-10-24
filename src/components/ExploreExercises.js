import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../api/exerciseApi'; // Adjust path if necessary
import styled from 'styled-components'; // Import styled-components
import './ExploreExercises.css'; 
const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ExerciseCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const ExerciseImage = styled.img`
  max-width: 100%;
  height: auto;
`;

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
      <ExerciseGrid>
        {exercises.map(exercise => (
          <ExerciseCard key={exercise.id}>
            <h3>{exercise.name}</h3>
            <ExerciseImage src={exercise.gifUrl} alt={exercise.name} />
          </ExerciseCard>
        ))}
      </ExerciseGrid>
    </div>
  );
};

export default ExploreExercises;
