import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutHistory from "./components/WorkoutHistory";
import LoginButton from "./components/LoginButton";
import LogOut from "./components/LogOut";

function App() {
  const { isAuthenticated } = useAuth0(); // To check if the user is authenticated
  const [activeTab, setActiveTab] = useState(null); // Set initial state to null

  // Function to handle tab switch
  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="website-name">Fit Track</h1>
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <div>
            <nav>
              <button onClick={() => handleTabSwitch("workoutForm")}>
                Log Workout
              </button>
              <button onClick={() => handleTabSwitch("workoutHistory")}>
                View History
              </button>
              <LogOut />
            </nav>
            <main>
              {activeTab === "workoutForm" && <WorkoutForm />}
              {activeTab === "workoutHistory" && <WorkoutHistory />}
            </main>
            {/* Optional: Set a default tab, e.g., to display workout history */}
            {/* <main>
              {activeTab === null && <WorkoutHistory />} 
            </main> */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
