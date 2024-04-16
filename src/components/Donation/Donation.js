import React, { useState } from 'react';
import './Donation.css'
import axios from 'axios';

function Donation({customerId}){
  // State variables to store donation information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [donationDate, setDonationDate] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();


    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Use functional form of setState to ensure you're working with the latest state value
    setDonationDate(prevDoA => formattedDate);

    // Logging the donation information
    console.log('Donor Name:', name);
    console.log('Donor Email:', email);
    console.log('Donation Amount (USD):', amount);
    console.log('Donation Date:', formattedDate);
    // Add backend logic here to save donation information
    // For example, you can make an API call to send this data to the server
    // After saving the data, you can show a success message or handle errors accordingly


    const data = {
      donationAmount: amount,
      customerId: customerId,
      donationDate: formattedDate
    };
    axios.post('http://localhost:5095/api/ZooDb/NewDonation', data)
    .then((res) =>{console.log(res); });

  };
  

  return (
    <div className="App-donation">
      <header className="Header-donation">
      </header>
      <main className="Main-donation">
        <p>
          To make a donation, please fill out the form below:
        </p>
        <form className="DonationForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="amount">Amount (USD):</label>
          <input type="number" id="amount" name="amount" min="1" required value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
          <button type="submit">Donate</button>
        </form>
      </main>
      <footer className="Footer-donation">
        <p>Thank you for supporting our zoo!</p>
      </footer>
    </div>
  );
};

export default Donation;
