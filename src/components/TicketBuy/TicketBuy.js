import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TicketBuy.css';

import axios from 'axios';

function TicketBuy({ customerId }) {
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [infantTickets, setInfantTickets] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [discount, setDiscount] = useState(false);


  const adultPrice = 10;
  const childPrice = 7;
  const seniorPrice = 6;
  const infantPrice = 5;

  const handleAdultChange = (event) => {
    const value = Number(event.target.value);
    setAdultTickets(value >= 0 ? value : 0);
  };

  const handleChildChange = (event) => {
    const value = Number(event.target.value);
    setChildTickets(value >= 0 ? value : 0);
  };

  const handleSeniorChange = (event) => {
    const value = Number(event.target.value);
    setSeniorTickets(value >= 0 ? value : 0);
  };

  const handleInfantChange = (event) => {
    const value = Number(event.target.value);
    setInfantTickets(value >= 0 ? value : 0);
  };

  var totalCost = (adultTickets * adultPrice) + (childTickets * childPrice) + (seniorTickets * seniorPrice) + (infantTickets * infantPrice);
  const discountedCost = totalCost * 0.9; // 10% discount



  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }
  
    const userData = {
      CustomerId: customerId,
    };
  
    axios.post(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/CheckDiscountStatus`, userData)
      .then(response => {
        if (response.data.DiscountApplied) {
          setDiscount(true);
          // Update totalCost with discountedCost
          totalCost = discountedCost;
          console.log("This is total cost",totalCost);
  
          // Proceed with the purchase
          proceedWithPurchase();
        } else {
          // Proceed with the purchase without discount
          proceedWithPurchase();
        }
      })
      .catch(error => console.error('Error:', error));
  };
  
  const proceedWithPurchase = () => {
    console.log('Adult Tickets:', adultTickets);
    console.log('Child Tickets:', childTickets);
    console.log('Senior Tickets:', seniorTickets);
    console.log('Infant Tickets:', infantTickets);
    console.log('Selected Date:', selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
    console.log('Total Cost:', totalCost);
  
    const formattedDate = selectedDate ? `${('0' + (selectedDate.getMonth() + 1)).slice(-2)}/${('0' + selectedDate.getDate()).slice(-2)}/${selectedDate.getFullYear()}` : null;
  
    const data = {
      adultTickets: adultTickets,
      childTickets: childTickets,
      seniorTickets: seniorTickets,
      infantTickets: infantTickets,
      formattedDate: formattedDate,
      totalCost: totalCost,
      customerId: customerId
    };
  
    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewTickets', data)
      .then((res) => {
        console.log(res);
        alert('Tickets successfully purchased!');
        setAdultTickets(0);
        setChildTickets(0);
        setSeniorTickets(0);
        setInfantTickets(0);
        setSelectedDate(null);
        setDiscount(false);
        
      })
      .catch((error) => {
        console.error('Error purchasing tickets:', error);
        alert('Failed to purchase tickets. Please try again.');
      });
  };
  

  return (
    <div className="ticket-buy-container">
      <div className="buy-menu">
        <h1>Welcome to the Zoo!</h1>
        <div className="ticket-types">
          <div className="ticket-type">
            <label>Adult (Ages 13-64):</label>
            <input
              type="number"
              value={adultTickets}
              onChange={handleAdultChange}
            />
            <span>${adultPrice} each</span>
          </div>
          <div className="ticket-type">
            <label>Child (Ages 3-12):</label>
            <input
              type="number"
              value={childTickets}
              onChange={handleChildChange}
            />
            <span>${childPrice} each</span>
          </div>
          <div className="ticket-type">
            <label>Senior (Age 65+):</label>
            <input
              type="number"
              value={seniorTickets}
              onChange={handleSeniorChange}
            />
            <span>${seniorPrice} each</span>
          </div>
          <div className="ticket-type">
            <label>Infant (2 & Under):</label>
            <input
              type="number"
              value={infantTickets}
              onChange={handleInfantChange}
            />
            <span>${infantPrice} each</span>
          </div>
        </div>
        <div className="datepicker-container">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="total-cost">Total Cost: ${totalCost}</div>
        {discount && <div className="discounted-cost"> Birthday Discounted Cost (10% off): ${discountedCost.toFixed(2)}</div>}
        <button type="submit" onClick={handleSubmit}>Buy Tickets</button>
      </div>
    </div>
  );
}

export default TicketBuy;
