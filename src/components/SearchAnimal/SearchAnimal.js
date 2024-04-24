import React, { useState, useEffect } from 'react';
import './SearchAnimal.css';
import axios from 'axios';

function SearchAnimal() {
  const [animalName, setAnimalName] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [animalDoBStart, setAnimalDoBStart] = useState('');
  const [animalDoBEnd, setAnimalDoBEnd] = useState('');
  const [animalEndangered, setAnimalEndangered] = useState('');
  const [animalDoAStart, setAnimalDoAStart] = useState('');
  const [animalDoAEnd, setAnimalDoAEnd] = useState('');
  const [animalOrigin, setAnimalOrigin] = useState('');

  const [queryData, setQueryData] = useState([]);
  const [animalSpeciesList, setAnimalSpeciesList] = useState([]);

  useEffect(() => {
    const fetchAnimalSpecies = async () => {
      try {
        const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllAnimalSpecies');
        setAnimalSpeciesList(response.data.map(species => species.animal_species));
      } catch (error) {
        console.error('Error fetching animal species:', error);
      }
    };

    fetchAnimalSpecies();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      animalName: animalName || null,
      animalSpecies: animalSpecies || null,
      animalGender: animalGender || null,
      animalDoBStart: animalDoBStart || null,
      animalDoBEnd: animalDoBEnd || null,
      animalEndangered: animalEndangered || null,
      animalDoAStart: animalDoAStart || null,
      animalDoAEnd: animalDoAEnd || null,
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
          <select
            id="animalSpecies"
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            className="input"
          >
            <option value="">Select Species</option>
            {animalSpeciesList.map((species, index) => (
              <option key={index} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="animalGender">Animal Gender:</label>
          <select
            id="animalGender"
            value={animalGender}
            onChange={(e) => setAnimalGender(e.target.value)}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="animalDoBStart">Date of Birth (From):</label>
          <input
            type="date"
            id="animalDoBStart"
            value={animalDoBStart}
            onChange={(e) => setAnimalDoBStart(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalDoBEnd">Date of Birth (To):</label>
          <input
            type="date"
            id="animalDoBEnd"
            value={animalDoBEnd}
            onChange={(e) => setAnimalDoBEnd(e.target.value)}
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
          <label htmlFor="animalDoAStart">Date of Arrival (From):</label>
          <input
            type="date"
            id="animalDoAStart"
            value={animalDoAStart}
            onChange={(e) => setAnimalDoAStart(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="animalDoAEnd">Date of Arrival (To):</label>
          <input
            type="date"
            id="animalDoAEnd"
            value={animalDoAEnd}
            onChange={(e) => setAnimalDoAEnd(e.target.value)}
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
                  <td>{formatDate(animal.animalDoB)}</td>
                  <td>{animal.animalEndangered ? 'Yes' : 'No'}</td>
                  <td>{formatDate(animal.animalDoA)}</td>
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
