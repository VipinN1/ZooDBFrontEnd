// Import required modules and hooks
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './CustomerProfile.css';

function CustomerProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(location.state ? location.state.email : ''); // Set email from navigation state
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dob, setDob] = useState(null);

  // Handler functions
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleZipCodeChange = (event) => setZipCode(event.target.value);
  const handleDobChange = (date) => setDob(date);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !email || !address || !zipCode || !dob) {
      alert('Please fill in all fields');
      return;
    }
    navigate('/sign-in');
    const formattedDate = dob.toISOString().slice(0, 10);
    const data = {
      firstName, lastName, phoneNumber, email, address, zipCode, formattedDate
    };
    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewUserProfile', data)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };

  return (
    <div className="customer-profile-container">
      <h2>Customer Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:<input type="text" value={firstName} onChange={handleFirstNameChange} /></label>
        <label>Last Name:<input type="text" value={lastName} onChange={handleLastNameChange} /></label>
        <label>Phone Number:<input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} /></label>
        <label>Email:<input type="email" value={email} onChange={(e) => {}} disabled={true} /></label>
        <label>Address:<input type="text" value={address} onChange={handleAddressChange} /></label>
        <label>Zip Code:<input type="text" value={zipCode} onChange={handleZipCodeChange} /></label>
        <label>Date of Birth: (Cannot be changed later)<DatePicker selected={dob} onChange={handleDobChange} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={125} /></label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CustomerProfile;
