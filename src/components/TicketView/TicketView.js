import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketView.css';

function TicketView({ customerId }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios.get(`http://localhost:5095/api/ZooDb/viewTickets?customerId=${customerId}`)
      .then(response => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, [customerId]); // Fetch data when customerId changes

  return (
    <div className="ticket-view-container">
      <h2 className="zoo-title">+++++++++++++++++++++++++++++++++++++++++++</h2>
      {loading ? (
        <p className="loading-text">Fetching ticket information...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : tickets.length > 0 ? (
        <div className="ticket-info">
          <h3 className="purchase-text">Purchased Tickets</h3>
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Date of Scheduled Visit</th>
                <th>Adult Tickets</th>
                <th>Child Tickets</th>
                <th>Senior Tickets</th>
                <th>Infant Tickets</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.ticket_id}</td>
                  <td>{new Date(ticket.visit_date).toLocaleDateString()}</td>
                  <td>{ticket.adult_tickets}</td>
                  <td>{ticket.child_tickets}</td>
                  <td>{ticket.senior_tickets}</td>
                  <td>{ticket.infant_tickets}</td>
                  <td>${ticket.total_cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-ticket-text">No Ticket History </p>
      )}
    </div>
  );
}

export default TicketView;