import React, { useState } from 'react';
import './SecurityReport.css';
import axios from 'axios';

function SecurityReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [queryOption, setQueryOption] = useState('dates');
  const [errorMessage, setErrorMessage] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input data
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
    if (endDate > currentDate) {
      setErrorMessage('End date cannot be after the present date');
      return;
    }
    if (queryOption === 'dates' && startDate > endDate) {
      setErrorMessage('Start date cannot be after end date');
      return;
    }

    setErrorMessage('');

    try {
      const endpointUrl = queryOption === 'dates'
        ? 'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/ZooDb/GenerateSecurityReportByDates'
        : 'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GenerateSecurityReportByDatesAndLocation';

      const payload = queryOption === 'dates'
        ? { startDate, endDate }
        : { startDate, endDate, location };

      const response = await axios.post(endpointUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setReportData(response.data);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to generate report. Please try again later.');
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setErrorMessage('');
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setErrorMessage('');
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleQueryOptionChange = (e) => {
    setQueryOption(e.target.value);
  };

  return (
    <div className="security-report-container">
      <h2 className="security-report-title">Security Report</h2>
      <form onSubmit={handleSubmit} className="security-report-form">
        <div className="security-form-group">
          <label htmlFor="queryOption" className="security-label">Query Option:</label>
          <select id="queryOption" value={queryOption} onChange={handleQueryOptionChange} className="security-select">
            <option value="dates">By Dates</option>
            <option value="datesAndLocation">By Dates and Location</option>
          </select>
        </div>
        <div className="security-form-group">
          <label htmlFor="startDate" className="security-label">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required={queryOption !== 'location'}
            className="security-input"
          />
        </div>
        <div className="security-form-group">
          <label htmlFor="endDate" className="security-label">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required={queryOption !== 'location'}
            className="security-input"
          />
        </div>
        {queryOption === 'datesAndLocation' && (
          <div className="security-form-group">
            <label htmlFor="location" className="security-label">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="security-input"
            />
          </div>
        )}
        <button type="submit" className="security-button">Generate Report</button>
        {errorMessage && <p className="security-error-message">{errorMessage}</p>}
      </form>

      {reportData.length > 0 && (
        <div className="report-data">
          <h3>Logs within the timeframe (and location if provided):</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Location</th>
                <th>Severity Level</th>
              </tr>
            </thead>
            <tbody>
                {reportData.map((report, index) => (
                    <tr key={index}>
                        <td>{report.logID}</td>
                        <td>{report.empID}</td>
                        <td>{new Date(report.date).toLocaleDateString()}</td>
                        <td>{report.time}</td>
                        <td>{report.eventDescription}</td>
                        <td>{report.location}</td>
                        <td>{report.severityLevel}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SecurityReport;