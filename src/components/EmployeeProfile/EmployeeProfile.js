// EmployeeProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeProfile.css'; // Import EmployeeProfile.css for styling

function EmployeeProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleHireDateChange = (event) => {
    setHireDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission, such as sending data to a server or storing it locally
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Hire Date:', hireDate);
    if(firstName && lastName && dateOfBirth && email && phoneNumber && hireDate){
      navigate('/sign-in');
    }
    
  };

  return (
    <div className="employee-profile-container">
      <h2>Employee Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <label>Hire Date:</label>
          <input
            type="date"
            value={hireDate}
            onChange={handleHireDateChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EmployeeProfile;