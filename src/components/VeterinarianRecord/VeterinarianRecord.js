import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VeterinarianRecord.css';

function VeterinarianRecord() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [medications, setMedications] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [animalSpeciesList, setAnimalSpeciesList] = useState([]);

  useEffect(() => {
    // Function to fetch all animal species
    const fetchAnimalSpecies = async () => {
      try {
        const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllAnimalSpecies');
        setAnimalSpeciesList(response.data);
      } catch (error) {
        console.error('Failed to fetch animal species:', error);
        alert('Failed to fetch animal species.');
      }
    };

    // Call the function when the component mounts
    fetchAnimalSpecies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate weight and height
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
  
    if (isNaN(parsedWeight) || parsedWeight <= 0 || isNaN(parsedHeight) || parsedHeight <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }
  
    // Check if animal name, species, and DoB are provided
    if (!animalName || !animalSpecies || !animalDoB) {
      alert('Please provide the animal name, species, and date of birth.');
      return;
    }
  
    // Check if the selected animal species exists in the list of available animal species
    const animalExists = animalSpeciesList.some(species => species.animal_species === animalSpecies);
    if (!animalExists) {
      alert('The selected animal species does not exist.');
      return;
    }
  
    const medicationsArray = medications.split(',').filter((med) => med.trim() !== '');
  
    const medicationJSON = JSON.stringify(medicationsArray).replace(/^\[|\]$/g, '');
  
    const data = {
      animalName: animalName,
      animalSpecies: animalSpecies,
      animalDoB: animalDoB,
      weight: parsedWeight,
      height: parsedHeight,
      medications: medicationJSON,
      diagnosis: diagnosis
    };
  
    try {
      const response = await axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewVetRecords', data);
  
      // Check if the response indicates that no such animal is found
      if (response.data === 'No such animal found') {
        alert('No such animal found.');
        return;
      }
  
      console.log(response);
      window.alert('Submit successful');
    } catch (error) {
      console.error('Error submitting data:', error);
      window.alert('Error submitting data');
    }
  };
  

  return (
    <div className="veterinarian-records-container">
      <h2>Veterinarian Records</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="animalName">Animal Name:</label>
          <input
            type="text"
            id="animalName"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            className="input-diet-form"
            required
          />
        </div>
        <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="animalSpecies">Animal Species:</label>
          <select
            id="animalSpecies"
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            className="input-diet-form"
            required
          >
            <option value="">Select Species</option>
            {animalSpeciesList.map((species, index) => (
              <option key={index} value={species.animal_species}>
                {species.animal_species}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="animalDoB">Animal DoB:</label>
          <input
            type="date"
            id="animalDoB"
            value={animalDoB}
            onChange={(e) => setAnimalDoB(e.target.value)}
            className="input-diet-form"
            required
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="weight">Weight (lbs):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-vet"
            required
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="height">Height (in):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input-vet"
            required
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="medications">Medications:</label>
          <textarea
            id="medications"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="Enter medications separated by commas"
            className="input-vet"
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="diagnosis">Diagnosis:</label>
          <textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis"
            className="input-vet"
          />
        </div>
        <button className="button-vet" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VeterinarianRecord;