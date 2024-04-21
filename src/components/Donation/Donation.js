import React, { useState } from 'react';
import './Donation.css';
import axios from 'axios';

function Donation({ customerId }) {
  const [amount, setAmount] = useState(0);
  const [specialName, setSpecialName] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Always include donatedName in the payload, set to null if amount is below 100
    const data = {
      donationAmount: amount,
      customerId: customerId,
      donationDate: formattedDate,
      donatedName: amount >= 100 ? specialName : ""
    };

    axios.post('http://localhost:5095/api/ZooDb/NewDonation', data)
      .then((res) => {
        console.log(res);
        alert('Donation successful!');
        if (amount >= 100) {
          setFormDisabled(true); // Disable the donation form
        }
      })
      .catch(err => {
        console.error('Error submitting donation:', err);
        alert('Error submitting donation. Please check your input and try again.');
      });
  };

  return (
    <div className="App-donation">
      <main className="Main-donation">
        <p>To make a donation, please fill out the form below:</p>
        <form className={`DonationForm ${formDisabled ? 'DonationForm-disabled' : ''}`} onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount (USD):</label>
          <input type="number" id="amount" name="amount" min="1" required value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
          {amount >= 100 && (
            <>
              <label htmlFor="specialName">Special Name for a new animal (required):</label>
              <input type="text" id="specialName" name="specialName" value={specialName} onChange={(e) => setSpecialName(e.target.value)} required />
              <p>This name may be selected for a name for a new animal.</p>
            </>
          )}
          <button type="submit">Donate</button>
        </form>
      </main>
    </div>
  );
};

export default Donation;
