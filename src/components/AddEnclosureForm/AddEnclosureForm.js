import React, { useState } from 'react';
import axios from 'axios';
import './AddEnclosureForm.css';

const AddEnclosureForm = ({ onAddEnclosure }) => {
  const [name, setName] = useState('');
  const [enclosure_type, setType] = useState('');
  const [build_date, setBuildDate] = useState('');
  const [cleaning_start, setCleaningStart] = useState('');
  const [cleaning_end, setCleaningEnd] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !enclosure_type || !build_date || !cleaning_start || !cleaning_end) {
      alert('Please fill in all fields');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
    if (build_date > currentDate) {
      alert('Build date cannot be after the present date');
      return;
    }

    const userData = {
      enclosureName: name,
      enclosureType: enclosure_type,
      builtDate: build_date,
      cleaningScheduleStart: cleaning_start,
      cleaningScheduleEnd: cleaning_end,
    };

    // Call the function passed from parent component to add enclosure
    // Reset form fields after submission
    handleReset();

    try {
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewEnclosure', userData);
      console.log('Response:', response);
      // Display success alert
      alert('Enclosure added successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        console.error('Non-Axios error:', error);
      }
    }
  }

  // Function to reset form fields
  const handleReset = () => {
    setName('');
    setType('');
    setBuildDate('');
    setCleaningStart('');
    setCleaningEnd('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="enclosure-form">
      <h2>Add Enclosure</h2>
      <div className="form-group-enclosure">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group-enclosure">
        <label htmlFor="enclosure_type">Enclosure Type:</label>
        <input
          type="text"
          id="enclosure_type"
          placeholder="Enclosure Type"
          value={enclosure_type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div className="form-group-enclosure">
        <label htmlFor="build_date">Build Date:</label>
        <input
          type="date"
          id="build_date"
          value={build_date}
          onChange={(e) => setBuildDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group-enclosure">
        <label htmlFor="cleaning_start">Cleaning Start Time:</label>
        <input
          type="time"
          id="cleaning_start"
          value={cleaning_start}
          onChange={(e) => setCleaningStart(e.target.value)}
          required
        />
      </div>
      <div className="form-group-enclosure">
        <label htmlFor="cleaning_end">Cleaning End Time:</label>
        <input
          type="time"
          id="cleaning_end"
          value={cleaning_end}
          onChange={(e) => setCleaningEnd(e.target.value)}
          required
        />
      </div>
      <div className="form-actions-enclosure">
        <button type="submit">Add Enclosure</button>
      </div>
    </form>
  );
};

export default AddEnclosureForm;
