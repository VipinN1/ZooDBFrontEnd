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
  const [animalLifeStage, setAnimalLifeStage] = useState('');
  const [animalDoA, setAnimalDoA] = useState('');

  // Function to reset form fields
  const handleReset = () => {
    setAnimalName('');
    setAnimalSpecies('');
    setAnimalGender('');
    setAnimalDoB('');
    setAnimalEndangered('');
    setAnimalOrigin('');
    setAnimalLifeStage('');
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // Get current date for Animal DoA
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Use functional form of setState to ensure you're working with the latest state value
    setAnimalDoA(prevDoA => formattedDate);

    console.log('Animal Name:', animalName);
    console.log('Animal Species:', animalSpecies);
    console.log('Animal Gender:', animalGender);
    console.log('Animal DoB:', animalDoB);
    console.log('Is Animal Endangered:', animalEndangered);
    console.log('Animal Origin:', animalOrigin);
    console.log('Animal Life Stage:', animalLifeStage);
    console.log('Animal DoA:', formattedDate);

    // Implement backend logic here to send the data inputs to the backend
    const userData = {
      animalName: animalName,
      animalSpecies: animalSpecies,
      animalGender: animalGender,
      animalDoB: animalDoB,
      animalEndangered: animalEndangered,
      animalOrigin: animalOrigin,
      animalLifeStage: animalLifeStage,
      animalDoA: formattedDate
    };

    // Call the function passed from parent component to add animal
    // Reset form fields after submission
    //handleReset();

    try {
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewAnimal', userData);
      console.log('Response:', response);
      // Handle success scenario
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // The error is specifically an AxiosError
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        // The error is not an AxiosError (could be a network error, etc.)
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
          <input
            type="text"
            id="animalGender"
            value={animalGender}
            onChange={(e) => setAnimalGender(e.target.value)}
            required
          />
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
            value={animalEndangered ? "Yes" : "No"} // Map boolean value to dropdown option
            onChange={(e) => setAnimalEndangered(e.target.value === "Yes")} // Map dropdown option to boolean value
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalOrigin">Animal Origin:</label>
          <input
            type="text"
            id="animalOrigin"
            value={animalOrigin}
            onChange={(e) => setAnimalOrigin(e.target.value)}
            required
          />
        </div>
        <div className="form-group-animal">
          <label htmlFor="animalLifeStage">Animal Life Stage:</label>
          <input
            type="text"
            id="animalLifeStage"
            value={animalLifeStage}
            onChange={(e) => setAnimalLifeStage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddAnimal;