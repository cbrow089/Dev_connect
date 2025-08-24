import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { LOGIN_USER } from '../utils/mutations'; // Adjust path as needed
import '../index.css';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { username, password }
      });

      const token = data?.loginUser?.token;

      if (token) {
        localStorage.setItem('id_token', token);
        navigate('/profile'); // Or wherever you want to redirect
      } else {
        console.error('No token returned from server');
      }

    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
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
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {error && <p className="error-message">Login failed. Please try again.</p>}
      <p>
        Don't have an account?{' '}
        <button onClick={handleSignup} className="signup-button">Sign up</button>
      </p>
    </div>
  );
};

export default Login