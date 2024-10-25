import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutHistory from "./components/WorkoutHistory";
import WorkoutStats from "./components/WorkoutStats";
import ExploreExercises from "./components/ExploreExercises";

import "./App.css"; // Import the CSS file for styling

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeTab, setActiveTab] = useState("logWorkout");

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {/* Header */}
          <header className="app-header">
            <h1 className="app-title">Fit Track</h1>
            <nav className="nav-buttons">
              <button onClick={() => setActiveTab("logWorkout")}>Workout Log</button>
              <button onClick={() => setActiveTab("workoutHistory")}>View History</button>
              <button onClick={() => setActiveTab("workoutStats")}>Statistics & Analytics</button>
              <button onClick={() => setActiveTab("exploreExercises")}>Explore Exercises</button>
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            </nav>
          </header>

          {/* Conditional Rendering based on the active tab */}
          {activeTab === "logWorkout" && <WorkoutForm />}
          {activeTab === "workoutHistory" && <WorkoutHistory />}
          {activeTab === "workoutStats" && <WorkoutStats />}
          {activeTab === "exploreExercises" && <ExploreExercises />}
        </div>
      ) : (
        <div className="login-container">
          <div className="login-content">
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/30/56/19/1000_F_430561955_D63q2kkC9gSFpb84Sr247aFLTjRyMOsP.jpg" // Placeholder image, replace with actual image
              alt="Workout Motivation"
              className="login-image"
            />
            <div className="login-details">
              <h2>Please log in to track your workouts.</h2>
              <button onClick={loginWithRedirect} className="login-button">
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
