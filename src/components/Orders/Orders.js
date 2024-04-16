import React, { useState } from 'react';
import './Orders.css';

function Orders() {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderInfo, setOrderInfo] = useState(null); // Remove type annotation for orderInfo

  const handleSearch = () => {
    // Store orderNumber and customerName in variables
    const searchedOrderNumber = orderNumber;
    const searchedCustomerName = customerName;

    // Console log the stored values
    console.log('Searched Order Number:', searchedOrderNumber);
    console.log('Searched Customer Name:', searchedCustomerName);

    // Implement logic here to send data to backend
    // For demonstration, I'm setting a dummy order info
    setOrderInfo({
      orderNumber: orderNumber,
      customerName: customerName,
      // Other order information
    });
  };

  return (
    <div className="App">
      <div className="banner">
        <h1>Orders</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Search by order number"
        />
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Search by customer name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {orderInfo && (
        <div className="order-info">
          <h2>Order Details</h2>
          <p>Order Number: {orderInfo.orderNumber}</p>
          <p>Customer Name: {orderInfo.customerName}</p>
          {/* Display other order information */}
        </div>
      )}
    </div>
  );
}

export default Orders;
