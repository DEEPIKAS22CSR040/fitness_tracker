// src/api/exerciseApi.js
import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
const API_KEY = '7b5318c0b2msh9f2be9eda9d7755p160a30jsnd4fd2413b7d6'; // Replace with your actual API key

export const fetchExercises = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
    });

    // Return only relevant data including images
    return response.data.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      image: exercise.gifUrl || exercise.image, // Use gifUrl if available
    }));
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; // Propagate the error to handle it in the component
  }
};
