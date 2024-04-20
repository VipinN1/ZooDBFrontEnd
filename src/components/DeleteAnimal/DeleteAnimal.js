import React, { useState } from 'react';
import './DeleteAnimal.css';
import axios from 'axios';

function DeleteAnimal() {
    const [animalName, setAnimalName] = useState('');
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [animalDoB, setAnimalDoB] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Log the input values for debugging purposes
        console.log('Animal Name:', animalName);
        console.log('Animal Species:', animalSpecies);
        console.log('Animal DoB:', animalDoB);

        // Ask for confirmation before deleting the animal
        const confirmed = window.confirm('Are you sure you want to delete this animal?');
        if (!confirmed) {
            // If the user does not confirm, do nothing
            return;
        }

        try {
            // Use axios to send a DELETE request with the animalName, animalSpecies, and animalDoB as parameters
            const response = await axios.delete('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Animal/Delete', {
                params: {
                    animalName,
                    animalSpecies,
                    animalDoB,
                },
            });

            // Log the response for debugging purposes
            console.log('Animal deleted:', response);
            
            // Handle success scenario
            alert('Animal deleted successfully.');
            
            // Clear input fields after deletion
            setAnimalName('');
            setAnimalSpecies('');
            setAnimalDoB('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error data:', error.response?.data);
                console.error('Error status:', error.response?.status);
                console.error('Error headers:', error.response?.headers);
            } else {
                console.error('Non-Axios error:', error);
            }
            alert('Failed to delete animal.');
        }
    };

    return (
        <div className="delete-animal-container">
            <h2>Delete Animal</h2>
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
                    <label htmlFor="animalDoB">Animal DoB:</label>
                    <input
                        type="date"
                        id="animalDoB"
                        value={animalDoB}
                        onChange={(e) => setAnimalDoB(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}

export default DeleteAnimal;
