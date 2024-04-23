import React, { useState, useEffect } from 'react';
import './AnimalReport.css';
import axios from 'axios';

function AnimalReport() {
    // State for the required form fields
    const [animalName, setAnimalName] = useState('');
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [animalDoB, setAnimalDoB] = useState('');
    const [animalSpeciesOptions, setAnimalSpeciesOptions] = useState([]); // State for animal species options

    // State to store data from each report
    const [animalData, setAnimalData] = useState(null);
    const [dietData, setDietData] = useState([]);
    const [vetData, setVetData] = useState([]);

    // Fetch animal species options
    useEffect(() => {
        fetchAnimalSpeciesOptions();
    }, []);

    const fetchAnimalSpeciesOptions = async () => {
        try {
            const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllAnimalSpecies');
            setAnimalSpeciesOptions(response.data.map(species => species.animal_species));
        } catch (error) {
            console.error('Error fetching animal species:', error);
        }
    };

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
            // Fetch animal data
            const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Animal/Get', {
                params: requestData,
            });

            const data = response.data;

            if (!data) {
                // Reset data and show alert if animal does not exist
                resetData();
                alert('No such animal found!');
                return;
            }

            // Set the animal data state with the retrieved data
            setAnimalData(data);

            // Check if animal data contains animalID
            if (data && data.animalID) {
                // Fetch vet data using the animalID
                const animalID = data.animalID;

                const dietResponse = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetDiet', {
                    params: requestData,
                });

                setDietData(dietResponse.data);

                const vetRecordsResponse = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetVetRecords', {
                    params: requestData,
                });

                // Set the vet data state with the retrieved data
                setVetData(vetRecordsResponse.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Reset data and show alert if there's an error
            resetData();
            alert('An error occurred while fetching data!');
        }
    };

    // Function to reset all data
    const resetData = () => {
        setAnimalData(null);
        setDietData([]);
        setVetData([]);
    };

    return (
        <div className="animal-report-container">
            <h2>Animal Report</h2>
            <form onSubmit={handleFormSubmit}>
                {/* Form inputs */}
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
                    <select
                        id="animalSpecies"
                        value={animalSpecies}
                        onChange={(e) => setAnimalSpecies(e.target.value)}
                        className="input"
                        required
                    >
                        <option value="">Select Animal Species</option>
                        {animalSpeciesOptions.map((species, index) => (
                            <option key={index} value={species}>{species}</option>
                        ))}
                    </select>
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
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Species</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Endangered</th>
                                <th>Date of Arrival</th>
                                <th>Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{animalData.animalName}</td>
                                <td>{animalData.animalSpecies}</td>
                                <td>{new Date(animalData.animalDoB).toLocaleDateString()}</td>
                                <td>{animalData.animalGender}</td>
                                <td>{animalData.animalEndangered ? 'Yes' : 'No'}</td>
                                <td>{new Date(animalData.animalDoA).toLocaleDateString()}</td>
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
