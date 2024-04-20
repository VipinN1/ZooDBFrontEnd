import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomerProfileUpdate.css';

function CustomerProfileUpdate({ customerId }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dob, setDob] = useState(new Date());
  const [oldData, setOldData] = useState({});

  useEffect(() => {
    axios.get(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetUserProfile?customerId=${customerId}`)
      .then(response => {
        const data = response.data;
        setOldData(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setPhoneNumber(data.phoneNumber || '');
        setAddress(data.address || '');
        setZipCode(data.zipCode || '');
        setDob(data.dob ? new Date(data.dob) : new Date());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [customerId]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formattedDate = dob.toISOString().slice(0, 10);

    const data = {
      ...oldData,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipCode,
      dob: formattedDate
    };

    axios.put(`http://localhost:5095/api/ZooDb/UpdateUserProfile/${customerId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('Response:', res.data);
      alert('Profile updated successfully');
    })
    .catch(error => {
      console.error('Update error:', error);
      alert('Profile failed to update');
    });
  };

  return (
    <div className="profile-update-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
        </label>
        <label>
          Zip Code:
          <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} required />
        </label>
       
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default CustomerProfileUpdate;