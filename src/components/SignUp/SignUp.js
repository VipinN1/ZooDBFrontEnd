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
    // Add your sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form fields after submission
    if(email && password){
    navigate('/customer-profile');
    setEmail('');
    setPassword('');
    }
    else{
      alert('enter both fields')
    }
    const data = {
      email: email,
      password: password,
      userType: 'customer'
    };

    axios.post('http://localhost:5095/api/ZooDb/NewUser', data)
      .then((res) =>{console.log(res); });
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