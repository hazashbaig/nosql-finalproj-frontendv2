// SignIn.jsx
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Signin successful. Token:', data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          window.location = "/Artworks";
          // Store the token in your state or context for further authentication
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      } else {
        alert("Incorrect username or password");
        console.error('Signin failed with status:', response.status);
        // Handle non-JSON responses here, e.g., redirect or show an error message
      }
    } catch (error) {
      console.error('An error occurred during signin:', error);
      // Handle unexpected errors here
    }
  };
  

  return (
    <div className="signin-container">
      <h2>Signin</h2>
      <label className="form-label">
        Username or Email:
        <input
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </label>
      <button onClick={handleSignin} className="signin-btn">
        Signin
      </button>
    </div>
  );
};

export default SignIn;
