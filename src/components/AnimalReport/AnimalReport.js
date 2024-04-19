import React, { useState } from 'react';
import './AnimalReport.css'; // Import your CSS file
import axios from 'axios';

function AnimalReport() {
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Animal Species:", animalSpecies);

    try {
      // Post request to fetch report data based on the animal species
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GenerateAnimalReport', {
        animalSpecies: animalSpecies,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Set the report data based on the response from the back-end
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

  return (
    <div className="animal-report-container">
      <h2 className="animal-report-title">Zoo Animal Report</h2>
      <form onSubmit={handleFormSubmit} className="animal-report-form">
        <label htmlFor="animalSpecies" className="animal-species-label">Animal Species:</label>
        <input
          type="text"
          id="animalSpecies"
          value={animalSpecies}
          onChange={(event) => setAnimalSpecies(event.target.value)}
          required
          className="animal-species-input"
        />
        <button type="submit" className="generate-report-button">Generate Report</button>
      </form>

      {/* If there is report data, display it in a table */}
      {reportData.length > 0 && (
        <div className="report-data">
          <h3>Animals of matching species:</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Animal ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Endangered</th>
                <th>Date of Arrival</th>
                <th>Origin</th>
                <th>Life Stage</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((animal, index) => (
                <tr key={index}>
                  <td>{animal.animalID}</td>
                  <td>{animal.animalName}</td>
                  <td>{animal.animalGender}</td>
                  <td>{new Date(animal.animalDoB).toLocaleDateString()}</td>
                  <td>{animal.animalEndangered ? 'Yes' : 'No'}</td>
                  <td>{new Date(animal.animalDoA).toLocaleDateString()}</td>
                  <td>{animal.animalOrigin}</td>
                  <td>{animal.animalLifeStage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnimalReport;