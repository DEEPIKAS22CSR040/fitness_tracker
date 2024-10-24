import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutForm from "./components/WorkoutForm"; // Make sure the path is correct
import WorkoutHistory from "./components/WorkoutHistory"; // Make sure the path is correct
import WorkoutStats from "./components/WorkoutStats"; // Make sure the path is correct
import ExploreExercises from "./components/ExploreExercises"; // Import the new component

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeTab, setActiveTab] = useState("logWorkout");

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <nav>
            <button onClick={() => setActiveTab("logWorkout")}>Workout Log</button>
            <button onClick={() => setActiveTab("workoutHistory")}>View History</button>
            <button onClick={() => setActiveTab("workoutStats")}>Statistics & Analytics</button>
            <button onClick={() => setActiveTab("exploreExercises")}>Explore Exercises</button> {/* New tab */}
            <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          </nav>

          {/* Conditional Rendering based on the active tab */}
          {activeTab === "logWorkout" && <WorkoutForm />}
          {activeTab === "workoutHistory" && <WorkoutHistory />}
          {activeTab === "workoutStats" && <WorkoutStats />}
          {activeTab === "exploreExercises" && <ExploreExercises />} {/* Render new component */}
        </div>
      ) : (
        <div>
          <h2>Please log in to track your workouts.</h2>
          <button onClick={loginWithRedirect}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default App;
