import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { ADD_USER } from '../utils/mutations';
import '../index.css'; // Reuse your existing styles

const Signup = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      const token = data?.addUser?.token;

      if (token) {
        localStorage.setItem('id_token', token);
        navigate('/profile'); // Redirect after successful signup
      } else {
        console.error('No token returned on signup');
      }

    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="error-message">Signup failed. Try again.</p>}
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="signup-button">
          Log in
        </button>
      </p>
    </div>
  );
};

export default Signup;
