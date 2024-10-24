import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Send user data to the backend
      axios.post('http://localhost:5000/saveUser', {
        name: user.name,
        email: user.email,
        picture: user.picture,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error saving the user data!', error);
      });
    }
  }, [isAuthenticated, user]);

  // Display loading message if the user data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render user profile only if authenticated
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt="Profile" />
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
      </div>
    )
  );
}

export default UserProfile;