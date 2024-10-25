import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './LoginButton.css'; // Import the CSS file for styling

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login-container">
      <img
        src="https://as2.ftcdn.net/v2/jpg/04/30/56/19/1000_F_430561955_D63q2kkC9gSFpb84Sr247aFLTjRyMOsP.jpg" // Placeholder image URL, replace with your actual image URL
        alt="Login"
        className="login-image"
      />
      <button onClick={() => loginWithRedirect()} className="login-button">
        Log in
      </button>
    </div>
  );
}

export default LoginButton;
