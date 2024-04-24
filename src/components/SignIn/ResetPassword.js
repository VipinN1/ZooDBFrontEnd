import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    

  
    axios.put(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/ResetPassword`, null, {
      params: {
        email: email,
        newPassword: password
      }
    })
        .then(response => {
        alert('Password successfully reset.');
        // Clear the form fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        if (error.response) {
         
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          alert('Failed to reset password: ' + error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
          alert('No response received when attempting to reset password.');
        } else {
          console.error('Error message:', error.message);
          alert('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="reset-password-container">
      <h2 className='h2-reset-password'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="input-field-reset-password"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
          className="input-field-reset-password"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="input-field-reset-password"
          required
        />
        <button type="submit" className="submit-button-reset-password">
          Reset Password
        </button>
      </form>
      <div className="signin-link-reset-password">
        <p>Remembered your password? <Link to="/sign-in">Sign in</Link></p>
      </div>
    </div>
  );
}

export default ResetPassword;
