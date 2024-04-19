import React, { useState } from 'react';
import axios from 'axios';
import './VeterinarianRecord.css';

function VeterinarianRecord() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [medications, setMedications] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const medicationsArray = medications.split(',').filter((med) => med.trim() !== '');

    console.log('Weight:', weight);
    console.log('Height:', height);
    console.log('Diagnosis:', diagnosis);
    const medicationJSON  = JSON.stringify(medicationsArray).replace(/^\[|\]$/g, '');
    console.log('Medications:', medicationJSON);





    // setWeight('');
    // setHeight('');
    // setMedications('');
    // setDiagnosis('');

    const data = {
      animalSpecies: animalSpecies,
      animalDoB: animalDoB,
      weight: weight,
      height: height,
      medications: medicationJSON,
      diagnosis: diagnosis
    }

    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewVetRecords',data)
      .then((res) =>{console.log(res); });
  };

  return (
    <div className="veterinarian-records-container">
      <h2>Veterinarian Records</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="animalSpecies">Animal Species:</label>
          <input
            type="text"
            id="animalSpecies"
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            className="input-diet-form"
          />
        </div>
        <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="animalDoB">Animal DoB:</label>
          <input
            type="text"
            id="animalDoB"
            value={animalDoB}
            onChange={(e) => setAnimalDoB(e.target.value)}
            className="input-diet-form"
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="weight">Weight (lbs):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value)))}
            min="0"
            step="0.01"
            className="input-vet"
          />
        </div>
        <div className="form-group-vet">
          <label className="label-vet" htmlFor="height">Height (in):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(Math.max(0, parseFloat(e.target.value)))}
            min="0"
            step="0.01"
            className="input-vet"
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
