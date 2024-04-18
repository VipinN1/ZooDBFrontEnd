// CustomerProfile.js
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './CustomerProfile.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function CustomerProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dob, setDob] = useState(null); // Changed initial state to null
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

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!firstName || !lastName || !phoneNumber || !email || !address || !zipCode || !dob) {
      alert('Please fill in all fields');
      return;
    }

    // Navigate to sign-in page
    navigate('/sign-in');

    // Format date
    const formattedDate = dob.toISOString().slice(0, 10);
    // Prepare data for API request
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      zipCode: zipCode,
      formattedDate: formattedDate
    };

    // Post data to API
    axios.post('http://localhost:5095/api/ZooDb/NewUserProfile', data)
      .then((res) => { console.log(res); })
      .catch((error) => { console.error(error); });
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
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </label>
        <label>
          Date of Birth:
          <DatePicker
                selected={dob}
                onChange={handleDobChange}
                showYearDropdown // Enable year dropdown
                scrollableYearDropdown // Enable scrollable year dropdown
                yearDropdownItemNumber={125} // Display 20 years in the dropdown
            />

        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CustomerProfile;
