import React, { useState } from 'react';
import './BusinessReport.css';

function BusinessReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [queryOption, setQueryOption] = useState('donations');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if StartDate is after EndDate
    if (startDate > endDate) {
      setErrorMessage('Start date cannot be after end date');
      return;
    }

    // Check if EndDate is after present date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
    if (endDate > currentDate) {
      setErrorMessage('End date cannot be after the present date');
      return;
    }

    console.log('Query Option:', queryOption);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    // Implement backend logic here based on the selected query option
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setErrorMessage('');
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setErrorMessage('');
  };

  const handleQueryOptionChange = (e) => {
    setQueryOption(e.target.value);
  };

  return (
    <div className="business-report-container">
      <h2 className="business-report-title">Business Report</h2>
      <form onSubmit={handleSubmit} className="business-report-form">
        <div className="business-form-group">
          <label htmlFor="queryOption" className="business-label">Query Option:</label>
          <select id="queryOption" value={queryOption} onChange={handleQueryOptionChange} className="business-select">
            <option value="donations">Donations by Date Window</option>
            <option value="hoursWorked">Employee Hours Worked by Date Window</option>
          </select>
        </div>
        <div className="business-form-group">
          <label htmlFor="startDate" className="business-label">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required
            className="business-input"
          />
        </div>
        <div className="business-form-group">
          <label htmlFor="endDate" className="business-label">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required
            className="business-input"
          />
        </div>
        <button type="submit" className="business-button">Generate Report</button>
        {errorMessage && <p className="business-error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default BusinessReport;
