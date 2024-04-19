import React, { useState } from 'react';
import './AddSecurityForm.css';
import axios from 'axios';

function AddSecurityForm({employeeId}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severityLevel, setSeverityLevel] = useState('low');
  //console.log(employeeId);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if the selected date is after the present date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
    if (date > currentDate) {
      alert('Date cannot be after the present date');
      return;
    }

    console.log('Date:', date);
    console.log('Time:', formatTime(time)); // Format time before logging
    console.log('Event Description:', eventDescription);
    console.log('Location:', location);
    console.log('Severity Level:', severityLevel);
    // Backend logic for sending data to the backend should be implemented here
    // Example: sendSecurityEventDataToBackend({ date, time, eventDescription, location, severityLevel });
    const data = {
      empId: employeeId,
      date: date,
      time: time,
      eventDescription: eventDescription,
      location: location,
      severityLevel: severityLevel
    }
    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewSecurityReport', data)
      .then((res) =>{console.log(res); });
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedTime = `${parseInt(hours) % 12 || 12}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  };

  return (
    <div className="add-security-form-container">
      <h2>Add Security Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-security-form">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input-field-security-form" // Add the new class name here
          />
        </div>
        <div className="form-group-security-form">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            required
            className="input-field-security-form" // Add the new class name here
          />
        </div>
        <div className="form-group-security-form">
          <label htmlFor="eventDescription">Event Description:</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
            className="input-field-security-form" // Add the new class name here
          />
        </div>
        <div className="form-group-security-form">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="input-field-security-form" // Add the new class name here
          />
        </div>
        <div className="form-group-security-form">
          <label htmlFor="severityLevel">Severity Level:</label>
          <select
            id="severityLevel"
            value={severityLevel}
            onChange={(e) => setSeverityLevel(e.target.value)}
            className="input-field-security-form" // Add the new class name here
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button className="security-button" type="submit-security-form">Submit</button>
      </form>
    </div>
  );
}

export default AddSecurityForm;