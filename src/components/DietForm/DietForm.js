import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DietForm.css';

function DietForm() {
  const [animalName, setAnimalName] = useState('');
  const [dietName, setDietName] = useState('');
  const [dietType, setDietType] = useState('');
  const [dietSchedule, setDietSchedule] = useState([]);
  const [animalSpeciesList, setAnimalSpeciesList] = useState([]);
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalDoB, setAnimalDoB] = useState('');
  const [time, setTime] = useState('');
  const [isDietScheduleValid, setIsDietScheduleValid] = useState(false);

  useEffect(() => {
    // Fetch animal species list when component mounts
    const fetchAnimalSpecies = async () => {
      try {
        const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllAnimalSpecies');
        setAnimalSpeciesList(response.data);
      } catch (error) {
        console.error('Failed to fetch animal species:', error);
        alert('Failed to fetch animal species.');
      }
    };

    fetchAnimalSpecies();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if the selected animal species exists in the list of available animal species
    if (!animalSpeciesList.some(species => species.animal_species === animalSpecies)) {
      alert('Animal species does not exist.');
      return; // Stop further execution
    }
  
    const dietScheduleString = dietSchedule.join(', '); // Convert array to comma-separated string
  
    const data = {
      animalName: animalName,
      animalSpecies: animalSpecies,
      animalDoB: animalDoB,
      dietName: dietName,
      dietType: dietType,
      dietSchedule: dietScheduleString // Send dietSchedule as a single string
    };
  
    axios.post('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/NewDiet', data)
      .then((res) => {
        console.log(res);
        if (res.data === 'No such animal found') {
          alert('No such animal found'); // Display alert when no such animal is found
        } else {
          alert(res.data); // Display alert when submit is successful
          setAnimalName('');
          setDietName('');
          setDietType('');
          setAnimalSpecies('');
          setAnimalDoB('');
          setDietSchedule([]);



        }
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        alert('Error submitting data'); // Display alert if there's an error
      });
  };
  
  

  const handleAddSchedule = () => {
    if (time !== '') {
      const [hours, minutes] = time.split(':');

      const selectedTime = new Date();
      selectedTime.setHours(parseInt(hours));
      selectedTime.setMinutes(parseInt(minutes));

      if (!isNaN(selectedTime.getTime())) {
        const formattedTime = selectedTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        setDietSchedule([...dietSchedule, formattedTime]);
        setTime('');
        setIsDietScheduleValid(true);
      } else {
        alert('Please select a valid time');
      }
    } else {
      alert('Please select a valid time');
    }
  };

  const handleDietTypeChange = (event) => {
    setDietType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="diet-form-container">
      <h2>Diet Form</h2>
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
          <option value="">Select Animal Species</option>
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
      <form onSubmit={handleSubmit}>
        <div className="form-group-diet-form">
          <label className='label-diet-form' htmlFor="dietName">Diet Name:</label>
          <input
            type="text"
            id="dietName"
            value={dietName}
            onChange={(e) => setDietName(e.target.value)}
            className="input-diet-form"
            required
          />
        </div>
        <div className="form-group-diet-form">
          <label htmlFor="dietType">Diet Type:</label>
          <select
            id="dietType"
            value={dietType}
            onChange={handleDietTypeChange}
            className="input-diet-form"
            required
          >
            <option value="">Select Diet Type</option>
            <option value="carnivore">Carnivore</option>
            <option value="herbivore">Herbivore</option>
            <option value="omnivore">Omnivore</option>
          </select>
        </div>
        <div className="form-group-diet-form">
          <label htmlFor="dietSchedule">Diet Schedule:</label>
          <input
            type="time"
            id="dietSchedule"
            value={time}
            onChange={handleTimeChange}
            className="input-diet-form"
          />
          <button className='button-diet' type="button" onClick={handleAddSchedule}>Add Time</button>
        </div>
        <ul>
          {dietSchedule.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
        <button className='button-diet-2' type="submit" disabled={!isDietScheduleValid}>Submit</button>
      </form>
    </div>
  );
}

export default DietForm;