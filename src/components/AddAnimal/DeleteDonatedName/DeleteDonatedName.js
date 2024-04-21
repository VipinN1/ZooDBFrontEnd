import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteDonatedNameForm() {
  const [donatedNames, setDonatedNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    // Fetch donated names when the component mounts
    const fetchDonatedNames = async () => {
      try {
        const response = await axios.get('http://localhost:5095/api/ZooDb/GetDonatedNames');
        setDonatedNames(response.data);
      } catch (error) {
        console.error('Failed to fetch donated names:', error);
      }
    };

    fetchDonatedNames();
  }, []);

  const handleDelete = async () => {
    try {
        
      await axios.delete(`http://localhost:5095/api/ZooDb/DeleteDonatedName?donatedName=${selectedName}`);
      
      // Refetch donated names after deletion
      const response = await axios.get('http://localhost:5095/api/ZooDb/GetDonatedNames');
      setDonatedNames(response.data);
      setSelectedName('');
    } catch (error) {
        console.log(selectedName)
      console.error('Failed to delete donated name:', error);
    }
  };

  return (
    <div className="delete-donated-name-container">
      <h3>Delete Donated Name</h3>
      <select
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
      >
        <option value="">Select Name to Delete</option>
        {donatedNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedName}>Delete</button>
    </div>
  );
}

export default DeleteDonatedNameForm;
