import React, { useState } from 'react';
import './AddAnimal.css';
import axios from 'axios';

function AddAnimal() {
  const [animalName, setAnimalName] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');
  const [animalEndangered, setAnimalEndangered] = useState(false); // Use boolean state
  const [animalOrigin, setAnimalOrigin] = useState('');
  const [animalDoA, setAnimalDoA] = useState('');

  // Function to reset form fields
  const handleReset = () => {
    setAnimalName('');
    setAnimalSpecies('');
    setAnimalGender('');
    setAnimalDoB('');
    setAnimalEndangered(false);
    setAnimalOrigin('');
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // Get current date for Animal DoA
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    setAnimalDoA(formattedDate);

    console.log('Animal Name:', animalName);
    console.log('Animal Species:', animalSpecies);
    console.log('Animal Gender:', animalGender);
    console.log('Animal DoB:', animalDoB);
    console.log('Is Animal Endangered:', animalEndangered);
    console.log('Animal Origin:', animalOrigin);
    console.log('Animal DoA:', formattedDate);

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
      // Handle success scenario
      handleReset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        console.error('Non-Axios error:', error);
      }
    }
  };

  return (
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
  );
}

export default AddAnimal;
