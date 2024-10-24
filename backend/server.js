const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fittrack_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String,
});

const User = mongoose.model('User', userSchema);

// Route to save user data
app.post('/saveUser', async (req, res) => {
  const { name, email, picture } = req.body;
  console.log(req.body); // Log request body for debugging

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({ name, email, picture });
      await user.save();
      return res.status(201).send('User created');
    } else {
      // User already exists, send a message
      return res.status(200).send('User already exists');
    }
  } catch (error) {
    console.error('Error saving user:', error); // Log error for debugging
    return res.status(500).send('Error saving user'); // Send error response
  }
});

// Define Workout schema
const workoutSchema = new mongoose.Schema({
  userId: String,
  workoutType: String,
  duration: Number, // in minutes
  caloriesBurned: Number,
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model('Workout', workoutSchema);

// Route to save workout data
app.post('/saveWorkout', async (req, res) => {
  const { userId, workoutType, duration, caloriesBurned, date } = req.body;
  try {
    const workout = new Workout({ userId, workoutType, duration, caloriesBurned, date });
    await workout.save();
    res.status(201).send('Workout saved');
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).send('Error saving workout');
  }
});

// Route to fetch workout history for a user
app.get('/workouts/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const workouts = await Workout.find({ userId }).sort({ date: -1 }); // Sort by date (latest first)
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workout history:', error);
    res.status(500).send('Error fetching workout history');
  }
});

// Route to get workout history for a specific user
app.get('/getWorkoutHistory/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const workouts = await Workout.find({ userId });
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workout history:', error);
    res.status(500).send('Error fetching workout history');
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
