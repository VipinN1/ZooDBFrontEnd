import React, { useState, useEffect } from 'react';
import './SearchEnclosure.css';
import axios from 'axios';

function SearchEnclosure() {
  const [enclosureName, setEnclosureName] = useState('');
  const [enclosureType, setEnclosureType] = useState('');
  const [builtDateStart, setBuiltDateStart] = useState('');
  const [builtDateEnd, setBuiltDateEnd] = useState('');
  const [cleaningScheduleStart, setCleaningScheduleStart] = useState('');
  const [cleaningScheduleEnd, setCleaningScheduleEnd] = useState('');
  const [queryData, setQueryData] = useState([]);
  const [enclosureTypes, setEnclosureTypes] = useState([]);
  const [error, setError] = useState(null); // State to hold error

  useEffect(() => {
    async function fetchEnclosureTypes() {
      try {
        const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllEnclosureTypes');
        setEnclosureTypes(response.data);
      } catch (error) {
        console.error('Error fetching enclosure types:', error);
        setError('Error fetching enclosure types. Please try again.'); // Set error state
      }
    }

    fetchEnclosureTypes();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Function to format time to 12-hour format with AM/PM
  const formatTimeTo12Hour = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, '0')} ${period}`;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      enclosureName: enclosureName || null,
      enclosureType: enclosureType || null,
      builtDateStart: builtDateStart || null,
      builtDateEnd: builtDateEnd || null,
      cleaningScheduleStart: cleaningScheduleStart || null,
      cleaningScheduleEnd: cleaningScheduleEnd || null,
    };

    try {
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/SearchEnclosure', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setQueryData(response.data);
    } catch (error) {
      console.error('Error fetching query data:', error);
      setError('Error fetching query data. Please try again.'); // Set error state
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
          <select
            id="enclosureType"
            value={enclosureType}
            onChange={(e) => setEnclosureType(e.target.value)}
            className="input"
          >
            <option value="">Select Enclosure Type</option>
            {enclosureTypes.map((type, index) => (
              <option key={index} value={type.enclosure_type}>{type.enclosure_type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="builtDateStart">Built Date Start:</label>
          <input
            type="date"
            id="builtDateStart"
            value={builtDateStart}
            onChange={(e) => setBuiltDateStart(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="builtDateEnd">Built Date End:</label>
          <input
            type="date"
            id="builtDateEnd"
            value={builtDateEnd}
            onChange={(e) => setBuiltDateEnd(e.target.value)}
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

      {/* Error message */}
      {error && <div className="error">{error}</div>}

      {/* Query results */}
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
                  <td>{formatDate(enclosure.builtDate)}</td>
                  <td>{formatTimeTo12Hour(enclosure.cleaningScheduleStart)}</td>
                  <td>{formatTimeTo12Hour(enclosure.cleaningScheduleEnd)}</td>
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
