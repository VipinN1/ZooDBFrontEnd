import React, { useState } from 'react';
import './SearchAnimal.css';
import axios from 'axios';

function SearchAnimal() {
  const [animalName, setAnimalName] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');
  const [animalEndangered, setAnimalEndangered] = useState('');
  const [animalDoA, setAnimalDoA] = useState('');
  const [animalOrigin, setAnimalOrigin] = useState('');
  
  const [queryData, setQueryData] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      animalName: animalName || null,
      animalSpecies: animalSpecies || null,
      animalGender: animalGender || null,
      animalDoB: animalDoB || null,
      animalEndangered: animalEndangered || null,
      animalDoA: animalDoA || null,
      animalOrigin: animalOrigin || null,
    };

    try {
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/SearchAnimal', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setQueryData(response.data);
    } catch (error) {
      console.error('Error fetching query data:', error);
    }
  };

  return (
    <div className="animal-query-container">
      <h2>Zoo Animal Search</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="animalName">Animal Name:</label>
          <input
            type="text"
            id="animalName"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalSpecies">Animal Species:</label>
          <input
            type="text"
            id="animalSpecies"
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalGender">Animal Gender:</label>
          <input
            type="text"
            id="animalGender"
            value={animalGender}
            onChange={(e) => setAnimalGender(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalDoB">Date of Birth:</label>
          <input
            type="date"
            id="animalDoB"
            value={animalDoB}
            onChange={(e) => setAnimalDoB(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalEndangered">Endangered:</label>
          <select
            id="animalEndangered"
            value={animalEndangered}
            onChange={(e) => setAnimalEndangered(e.target.value)}
            className="input"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="animalDoA">Date of Arrival:</label>
          <input
            type="date"
            id="animalDoA"
            value={animalDoA}
            onChange={(e) => setAnimalDoA(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalOrigin">Origin:</label>
          <select
            id="animalOrigin"
            value={animalOrigin}
            onChange={(e) => setAnimalOrigin(e.target.value)}
            className="input"
          >
            <option value="">Select Origin</option>
            <option value="Captive Bred">Captive Bred</option>
            <option value="Wild Capture">Wild Capture</option>
            <option value="Transferred In">Transferred In</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Generate Query</button>
      </form>

      {queryData.length > 0 && (
        <div className="query-data">
          <h3>Animals Found:</h3>
          <table className="query-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Endangered</th>
                <th>Date of Arrival</th>
                <th>Origin</th>
              </tr>
            </thead>
            <tbody>
              {queryData.map((animal, index) => (
                <tr key={index}>
                  <td>{animal.animalName}</td>
                  <td>{animal.animalSpecies}</td>
                  <td>{animal.animalGender}</td>
                  <td>{new Date(animal.animalDoB).toLocaleDateString()}</td>
                  <td>{animal.animalEndangered ? 'Yes' : 'No'}</td>
                  <td>{new Date(animal.animalDoA).toLocaleDateString()}</td>
                  <td>{animal.animalOrigin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchAnimal;
