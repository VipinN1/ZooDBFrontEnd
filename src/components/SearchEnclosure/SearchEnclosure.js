import React, { useState } from 'react';
import './SearchEnclosure.css';
import axios from 'axios';

function SearchEnclosure() {
  // State variables for each form field
  const [enclosureName, setEnclosureName] = useState('');
  const [enclosureType, setEnclosureType] = useState('');
  const [builtDate, setBuiltDate] = useState('');
  const [cleaningScheduleStart, setCleaningScheduleStart] = useState('');
  const [cleaningScheduleEnd, setCleaningScheduleEnd] = useState('');

  const [queryData, setQueryData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      enclosureName: enclosureName || null,
      enclosureType: enclosureType || null,
      builtDate: builtDate || null,
      cleaningScheduleStart: cleaningScheduleStart || null,
      cleaningScheduleEnd: cleaningScheduleEnd || null,
    };

    try {
      // Post request to fetch enclosure data based on the input fields
      console.log('Request Data:', requestData);
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/SearchEnclosure', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Set the enclosure data based on the response from the back-end
      setQueryData(response.data);
    } catch (error) {
      console.error('Error fetching query data:', error);
    }
  };

  return (
    <div className="enclosure-query-container">
      <h2>Zoo Enclosure Search</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="enclosureName">Enclosure Name:</label>
          <input
            type="text"
            id="enclosureName"
            value={enclosureName}
            onChange={(e) => setEnclosureName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="enclosureType">Enclosure Type:</label>
          <input
            type="text"
            id="enclosureType"
            value={enclosureType}
            onChange={(e) => setEnclosureType(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="builtDate">Built Date:</label>
          <input
            type="date"
            id="builtDate"
            value={builtDate}
            onChange={(e) => setBuiltDate(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cleaningScheduleStart">Cleaning Schedule Start:</label>
          <input
            type="time"
            id="cleaningScheduleStart"
            value={cleaningScheduleStart}
            onChange={(e) => setCleaningScheduleStart(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cleaningScheduleEnd">Cleaning Schedule End:</label>
          <input
            type="time"
            id="cleaningScheduleEnd"
            value={cleaningScheduleEnd}
            onChange={(e) => setCleaningScheduleEnd(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Search Enclosures</button>
      </form>

      {queryData.length > 0 && (
        <div className="query-data">
          <h3>Enclosures Found:</h3>
          <table className="query-table">
            <thead>
              <tr>
                <th>Enclosure Name</th>
                <th>Enclosure Type</th>
                <th>Built Date</th>
                <th>Cleaning Schedule Start</th>
                <th>Cleaning Schedule End</th>
              </tr>
            </thead>
            <tbody>
              {queryData.map((enclosure, index) => (
                <tr key={index}>
                  <td>{enclosure.enclosureName}</td>
                  <td>{enclosure.enclosureType}</td>
                  <td>{new Date(enclosure.builtDate).toDateString()}</td>
                  <td>
                    {new Date(`1970-01-01T${enclosure.cleaningScheduleStart}Z`).toTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    {new Date(`1970-01-01T${enclosure.cleaningScheduleEnd}Z`).toTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchEnclosure;
