import React, { useState } from 'react';
import './EnclosureReport.css';
import axios from 'axios';

function EnclosureReport() {
  const [enclosureType, setEnclosureType] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Enclosure Type:", enclosureType);

    try {
      // Send a POST request to the backend to fetch report data based on the enclosure type
      const response = await axios.post('http://localhost:5095/api/ZooDb/GenerateEnclosureReport', {
        enclosureType: enclosureType,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Set the report data based on the response from the backend
      setReportData(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with:', error.response.status);
        console.error('Response data:', error.response.data);
        
        // Check if errors exist in the response
        if (error.response.data && error.response.data.errors) {
          console.error('Validation errors:', error.response.data.errors);
        }
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  // Helper function to format time as 'HH:mm' (24-hour format without seconds)
  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}Z`); // Convert time string to Date
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="enclosure-report-container">
      <h2 className="enclosure-report-title">Zoo Enclosure Report</h2>
      <form onSubmit={handleFormSubmit} className="enclosure-report-form">
        <label htmlFor="enclosureType" className="enclosure-type-label">Enclosure Type:</label>
        <input
          type="text"
          id="enclosureType"
          value={enclosureType}
          onChange={(event) => setEnclosureType(event.target.value)}
          required
          className="enclosure-type-input"
        />
        <button type="submit" className="generate-report-button">Generate Report</button>
      </form>

      {/* Display the report data in a table */}
      {reportData.length > 0 && (
        <div className="report-data">
          <h3>Enclosure Cleaning Times:</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Enclosure ID</th>
                <th>Enclosure Name</th>
                <th>Cleaning Schedule Start</th>
                <th>Cleaning Schedule End</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((enclosure, index) => (
                <tr key={index}>
                  <td>{enclosure.enclosureID}</td>
                  <td>{enclosure.enclosureName}</td>
                  <td>{formatTime(enclosure.cleaningScheduleStart)}</td>
                  <td>{formatTime(enclosure.cleaningScheduleEnd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EnclosureReport;