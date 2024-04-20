import React, { useState } from 'react';
import './RevenueReport.css';
import axios from 'axios';

function RevenueReport() {
  // State for each form field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  
  const [queryData, setQueryData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Request payload
    const requestData = {
      first_name: firstName.trim() || null,
      last_name: lastName.trim() || null,
      visit_date: visitDate || null,
      donation_date: donationDate || null,
      donation_amount: donationAmount || null,
    };
    
    console.log('Request Payload:', requestData);
    
    try {
      // Post request to fetch revenue data based on the input fields
      const response = await axios.post('http://localhost:5095/api/ZooDb/RevenueReport', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response Data:', response.data);
      // Set the report data based on the response from the back-end
      setQueryData(response.data);
    } catch (error) {
      console.error('Error fetching query data:', error);
    }
  };
  

  return (
    <div className="revenue-query-container">
      <h2>Zoo Revenue Report</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="visitDate">Visit Date:</label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="donationDate">Donation Date:</label>
          <input
            type="date"
            id="donationDate"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="donationAmount">Donation Amount:</label>
          <input
            type="number"
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Generate Report</button>
      </form>

      {/* Display report data if available */}
    {queryData.length > 0 && (
        <div className="query-data">
            <h3>Revenue Report:</h3>
            <table className="query-table">
            <thead>
                <tr>
                <th>Customer Name</th>
                <th>Transaction Type</th>
                <th>Date</th>
                <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {queryData.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.CustomerName}</td>
                    <td>{transaction.TransactionType}</td>
                    <td>{new Date(transaction.TransactionDate).toLocaleDateString()}</td>
                    <td>${transaction.Amount.toFixed(2)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </div>
  );
}

export default RevenueReport;