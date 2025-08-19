// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const navigate = useNavigate();

  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log and redirect — add real auth later
    console.log('Logging in with:', { username, password });

    // Simulate login and navigate to profile or dashboard
    navigate('/profile');
  };

  // Placeholder for sign up logic
  const handleSignup = () => {
    navigate('/signup'); // Make sure to create a route/page later
  };

 return (
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
      <button type="submit" className="login-button">Log In</button>
    </form>
    <p>
      Don't have an account?{' '}
      <button onClick={handleSignup} className="signup-button">Sign up</button>
    </p>
  </div>
);

};

export default Login;
