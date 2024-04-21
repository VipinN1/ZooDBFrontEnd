// SignUp.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './SignUp.css'; // Import SignUp.css for styling
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if email contains "@" symbol
    if (!email.includes('@')) {
      alert('Email must contain "@" symbol');
      return;
    }
  
    // Check if both email and password are entered
    if (!email || !password) {
      alert('Enter both fields');
      return;
    }
  
    // Proceed with form submission
    const data = {
      email: email,
      password: password,
      userType: 'customer'
    };
  
    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewUser', data)
      .then((res) => {
        console.log(res);
        alert('Successfully signed up!');
        navigate('/customer-profile', { state: { email: email } });
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Handle error here
      });
  };
  
  

  return (
    <div className="signup-container">
      <h2 className="h2-sign-up">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="input-field-sign-up"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="input-field-sign-up"
        />
        <button type="submit" className="submit-button-sign-up">Sign Up</button>
      </form>
      {/* <div><Link to="/customer-profile">Customer Profile</Link></div> //Made for testing the different pages
      <div><Link to="/employee-profile">Employee Profile</Link></div>
      <div><Link to="/ticket-buy">Ticket Buy</Link></div>
      <div><Link to="/ticket-view">Ticket View</Link></div>
      <div><Link to="/donation">Donation</Link></div> */}
      <div className="signin-link-sign-up">
        <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
      </div>
    </div>
  );
}

export default SignUp;