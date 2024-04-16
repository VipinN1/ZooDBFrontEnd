// CustomerProfile.js
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './CustomerProfile.css';
import axios from 'axios';

function CustomerProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    // Add logic to save or submit the form data
    if(firstName && lastName && phoneNumber && email){
      navigate('/sign-in')
    }
    else{
      alert("fill in all fields")
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email
    };
    axios.post('http://localhost:5095/api/ZooDb/NewUserProfile', data)
    .then((res) =>{console.log(res); });
  };

  return (
    <div className="customer-profile-container">
      <h2>Customer Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CustomerProfile;