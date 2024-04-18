import React, { useState } from 'react';
import './AnimalReport.css';
import axios from 'axios';

function AnimalReport() {
    // State for the required form fields
    const [animalName, setAnimalName] = useState('');
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [animalDoB, setAnimalDoB] = useState('');

    // State to store data from each report
    const [animalData, setAnimalData] = useState(null);
    const [dietData, setDietData] = useState([]);
    const [vetData, setVetData] = useState([]);

    // Handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Request payload with required fields
        const requestData = {
            animalName,
            animalSpecies,
            animalDoB,
        };

        try {
            // POST request to fetch animal report data
            const animalResponse = await axios.post('http://localhost:5095/api/ZooDb/Animal/Get`', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Get the animal data and animal ID from the response
            const animalData = animalResponse.data;
            setAnimalData(animalData);
            
            if (animalData && animalData.animalID) {
                // Fetch diet report data using the animal ID
                const dietResponse = await axios.post('http://localhost:5095/api/ZooDb/DietReport', { animalID: animalData.animalID }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setDietData(dietResponse.data);

                // Fetch vet records report data using the animal ID
                const vetResponse = await axios.post('http://localhost:5095/api/ZooDb/VetRecordsReport', { animalID: animalData.animalID }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setVetData(vetResponse.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="animal-report-container">
            <h2>Animal Report</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="animalName">Animal Name:</label>
                    <input
                        type="text"
                        id="animalName"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        className="input"
                        required
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
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Generate Report</button>
            </form>

            {/* Display animal data */}
            {animalData && (
                <div className="query-data">
                    <h3>Animal Information:</h3>
                    <table className="query-table">
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{animalData.animalName}</td>
                            </tr>
                            <tr>
                                <td>Species:</td>
                                <td>{animalData.animalSpecies}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth:</td>
                                <td>{new Date(animalData.animalDoB).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{animalData.animalGender}</td>
                            </tr>
                            <tr>
                                <td>Endangered:</td>
                                <td>{animalData.animalEndangered ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Date of Arrival:</td>
                                <td>{new Date(animalData.animalDoA).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Origin:</td>
                                <td>{animalData.animalOrigin}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display diet data */}
            {dietData.length > 0 && (
                <div className="query-data">
                    <h3>Diet Records:</h3>
                    <table className="query-table">
                        <thead>
                            <tr>
                                <th>Diet Name</th>
                                <th>Diet Type</th>
                                <th>Diet Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dietData.map((diet, index) => (
                                <tr key={index}>
                                    <td>{diet.dietName}</td>
                                    <td>{diet.dietType}</td>
                                    <td>{diet.dietSchedule}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display vet data */}
            {vetData.length > 0 && (
                <div className="query-data">
                    <h3>Vet Records:</h3>
                    <table className="query-table">
                        <thead>
                            <tr>
                                <th>Weight</th>
                                <th>Height</th>
                                <th>Diagnosis</th>
                                <th>Medications</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vetData.map((vet, index) => (
                                <tr key={index}>
                                    <td>{vet.weight}</td>
                                    <td>{vet.height}</td>
                                    <td>{vet.diagnosis}</td>
                                    <td>{vet.medications}</td>
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
