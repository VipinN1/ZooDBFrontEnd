import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './AddAnimal.css';

function AddAnimal() {
  const [animalName, setAnimalName] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');
  const [animalEndangered, setAnimalEndangered] = useState(false);
  const [animalOrigin, setAnimalOrigin] = useState('');
  const [donatedNames, setDonatedNames] = useState([]);

  const handleReset = () => {
    setAnimalName('');
    setAnimalSpecies('');
    setAnimalGender('');
    setAnimalDoB('');
    setAnimalEndangered(false);
    setAnimalOrigin('');
  };


  useEffect(() => {
    const fetchDonatedNames = async () => {
      try {
        const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetDonatedNames');
        setDonatedNames(response.data); 
      } catch (error) {
        console.error('Failed to fetch donated names:', error);
      }
    };

    fetchDonatedNames();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    if (animalDoB > formattedDate) {
      window.alert('Date of birth cannot be in the future.');
      return;
    }

    const userData = {
      animalName,
      animalSpecies,
      animalGender,
      animalDoB,
      animalEndangered,
      animalOrigin,
      animalDoA: formattedDate
    };

    try {
      const response = await axios.post('http://localhost:5095/api/ZooDb/NewAnimal', userData);
      console.log('Response:', response);
      window.alert('Submit successful'); // Display alert when submit is successful
      handleReset(); 
    } catch (error) {
      console.error('Error submitting data:', error);
      window.alert('Error submitting data'); // Display alert if there's an error
    }
  };

  return (
    <div className="donated-names-sidebar">
    <h3>Donated Names</h3>
    <ul>
      {donatedNames.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
    <div className="add-animal-container">
      <h2>Add Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-animal">
          <label htmlFor="animalName">Animal Name:</label>
          <input
            type="text"
            id="animalName"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            required
          />
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalSpecies">Animal Species:</label>
          <input
            type="text"
            id="animalSpecies"
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            required
          />
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalGender">Animal Gender:</label>
          <select
            id="animalGender"
            value={animalGender}
            onChange={(e) => setAnimalGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalDoB">Animal DoB:</label>
          <input
            type="date"
            id="animalDoB"
            value={animalDoB}
            onChange={(e) => setAnimalDoB(e.target.value)}
            required
          />
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalEndangered">Is Animal Endangered?</label>
          <select
            id="animalEndangered"
            value={animalEndangered ? "Yes" : "No"}
            onChange={(e) => setAnimalEndangered(e.target.value === "Yes")}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalOrigin">Animal Origin:</label>
          <select
            id="animalOrigin"
            value={animalOrigin}
            onChange={(e) => setAnimalOrigin(e.target.value)}
            required
          >
            <option value="">Select Origin</option>
            <option value="Captive Bred">Captive Bred</option>
            <option value="Wild Capture">Wild Capture</option>
            <option value="Transferred In">Transferred In</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default AddAnimal;