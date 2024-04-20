import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerProfileView.css';

function CustomerProfileView({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) {
      console.error("No customerId provided");
      setError("No customer ID provided");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    axios.get(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetUserProfile?customerId=${customerId}`)
      .then(response => {
        setCustomer(response.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching customer data:', err);
        setError('Failed to load customer data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [customerId]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error loading profile: {error}</div>;
  }

  if (!customer) {
    return <div className="error">No customer data available.</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">Customer Profile</h1>
      <div className="profile-info">
        <p className="fade-in">🐾 <strong>First Name:</strong> {customer.firstName}</p>
        <p className="fade-in">🐾 <strong>Last Name:</strong> {customer.lastName}</p>
        <p className="fade-in">📞 <strong>Phone:</strong> {customer.phoneNumber}</p>
        <p className="fade-in">📧 <strong>Email:</strong> {customer.email}</p>
        <p className="fade-in">🏠 <strong>Address:</strong> {customer.address}</p>
        <p className="fade-in">📮 <strong>Zip Code:</strong> {customer.zipCode}</p>
        <p className="fade-in">🎂 <strong>Date of Birth:</strong> {new Date(customer.formattedDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default CustomerProfileView;