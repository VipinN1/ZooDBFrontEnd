import React, { useState } from 'react';
import './RevenueReport.css';
import axios from 'axios';

function RevenueReport() {
  // State for form fields
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('all');
  const [queryData, setQueryData] = useState([]);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ticketTypePercentages, setTicketTypePercentages] = useState({
    AdultTickets: 0,
    ChildTickets: 0,
    SeniorTickets: 0,
    InfantTickets: 0,
  });
  const [reportGenerated, setReportGenerated] = useState(false); // Track if report has been generated

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Request payload
    const requestData = {
      transactionType,
      startDate: startDate || null,
      endDate: endDate || null,
    };
  
    // Log the request payload
    console.log('Request Payload:', requestData);
  
    // Post request to fetch revenue data based on the input fields
    try {
      const response = await axios.post(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/RevenueReport/${transactionType}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log the response data
      console.log('Response Data:', response.data);
  
      // Sort the response data by TransactionDate
      const sortedData = response.data.slice().sort((a, b) => {
        return new Date(a.TransactionDate) - new Date(b.TransactionDate);
      });
  
      // Set the report data based on the sorted response from the back-end
      setQueryData(sortedData);
  
      // Calculate total revenue
      const revenue = sortedData.reduce((acc, curr) => acc + curr.Amount, 0);
      setTotalRevenue(revenue);
  
      // Calculate ticket type percentages
      if (transactionType === 'ticket') {
        const ticketTypeTotals = {
          AdultTickets: 0,
          ChildTickets: 0,
          SeniorTickets: 0,
          InfantTickets: 0,
        };
  
        sortedData.forEach((transaction) => {
          ticketTypeTotals.AdultTickets += transaction.AdultTickets || 0;
          ticketTypeTotals.ChildTickets += transaction.ChildTickets || 0;
          ticketTypeTotals.SeniorTickets += transaction.SeniorTickets || 0;
          ticketTypeTotals.InfantTickets += transaction.InfantTickets || 0;
        });
  
        const totalTickets = sortedData.reduce((acc, transaction) => {
          if (transaction.TransactionType === 'Ticket Purchase') {
            acc += transaction.AdultTickets + transaction.ChildTickets + transaction.SeniorTickets + transaction.InfantTickets;
          }
          return acc;
        }, 0);
  
        const percentages = {
          AdultTickets: (ticketTypeTotals.AdultTickets / totalTickets) * 100,
          ChildTickets: (ticketTypeTotals.ChildTickets / totalTickets) * 100,
          SeniorTickets: (ticketTypeTotals.SeniorTickets / totalTickets) * 100,
          InfantTickets: (ticketTypeTotals.InfantTickets / totalTickets) * 100,
        };
  
        setTicketTypePercentages(percentages);
      } else {
        // If transactionType is not 'ticket', reset ticketTypePercentages
        setTicketTypePercentages({
          AdultTickets: 0,
          ChildTickets: 0,
          SeniorTickets: 0,
          InfantTickets: 0,
        });
      }
  
      // Show additional columns if transaction type is "Ticket Purchase"
      setShowAdditionalColumns(transactionType === 'ticket');
  
      // Set reportGenerated to true after generating the report
      setReportGenerated(true);
    } catch (error) {
      console.error('Error fetching query data:', error);
      // Clear query data in case of error
      setQueryData([]);
      // Reset total revenue and ticket type percentages
      setTotalRevenue(0);
      setTicketTypePercentages({
        AdultTickets: 0,
        ChildTickets: 0,
        SeniorTickets: 0,
        InfantTickets: 0,
      });
      // Set reportGenerated to false if error occurs
      setReportGenerated(false);
    }
  };
  

  return (
    <div className="revenue-query-container">
      <h2>Zoo Revenue Report</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="input"
          >
            <option value="all">All</option>
            <option value="ticket">Ticket Purchase</option>
            <option value="donation">Donation</option>
            <option value="membership">Membership</option> {/* Added membership option */}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Generate Report
        </button>
      </form>

      {/* Display report data if available and if reportGenerated is true */}
      {queryData.length > 0 && reportGenerated && (
        <div className="query-data">
          <h3>Revenue Report:</h3>
          <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
          {/* Display ticket type percentages only if "Ticket Purchase" is selected and the report is generated */}
          {showAdditionalColumns && (
            <div className="ticket-type-percentages">
              <h4>Ticket Type Percentages:</h4>
              <ul>
                {Object.entries(ticketTypePercentages).map(([type, percentage]) => (
                  <li key={type}>
                    {type}: {percentage.toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
          <table className="query-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Transaction Type</th>
                <th>Date</th>
                <th>Amount</th>
                {/* Only show additional columns if "Ticket Purchase" or "Membership" is selected and the report is generated */}
                {showAdditionalColumns && (
                  <>
                    <th>Adult Tickets</th>
                    <th>Child Tickets</th>
                    <th>Senior Tickets</th>
                    <th>Infant Tickets</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {queryData.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.CustomerName}</td>
                  <td>{transaction.TransactionType}</td>
                  <td>{transaction.TransactionDate ? new Date(transaction.TransactionDate).toLocaleDateString() : ""}</td>
                  <td>${transaction.Amount ? transaction.Amount.toFixed(2) : ""}</td>
                  {/* Display ticket type values only if the transaction type is "Ticket Purchase" */}
                  {showAdditionalColumns && transaction.TransactionType === "Ticket Purchase" && (
                    <>
                      <td>{transaction.AdultTickets || 0}</td>
                      <td>{transaction.ChildTickets || 0}</td>
                      <td>{transaction.SeniorTickets || 0}</td>
                      <td>{transaction.InfantTickets || 0}</td>
                    </>
                  )}
                  {/* Display membership type value only if the transaction type is "Membership" */}
                  {showAdditionalColumns && transaction.TransactionType === "Membership" && (
                    <>
                      <td></td> {/* Leave empty cell for Ticket Types */}
                      <td></td> {/* Leave empty cell for Ticket Types */}
                      <td></td> {/* Leave empty cell for Ticket Types */}
                      <td></td> {/* Leave empty cell for Ticket Types */}
                      <td>{transaction.MembershipType}</td>
                    </>
                  )}
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
