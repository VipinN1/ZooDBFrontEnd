import React, { useState, useEffect } from 'react';
import './AddAnimalToEnclosure.css';
import axios from 'axios';

function AddAnimalToEnclosure() {
    const [searchData, setSearchData] = useState({
        animalName: '',
        animalSpecies: '',
        animalDoB: ''
    });
    const [animalData, setAnimalData] = useState({
        animalID: '',
        animalName: '',
        animalSpecies: '',
        animalDoB: '',
        enclosureID: ''
    });
    const [enclosures, setEnclosures] = useState([]); // State for enclosures
    const [selectedEnclosure, setSelectedEnclosure] = useState(''); // State for selected enclosure

    const fetchAnimalData = async () => {
        try {
            // Fetch animal data based on searchData
            const response = await axios.get(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Animal/Get`, {
                params: {
                    animalName: searchData.animalName,
                    animalSpecies: searchData.animalSpecies,
                    animalDoB: searchData.animalDoB
                }
            });

            const data = response.data;

            // Format the date of birth to 'YYYY-MM-DD'
            const formattedDoB = data.animalDoB.split('T')[0];

            // Update the animalData state
            setAnimalData({
                animalID: data.animalID,
                animalName: data.animalName,
                animalSpecies: data.animalSpecies,
                animalDoB: formattedDoB,
                enclosureID: data.enclosureID
            });
        } catch (error) {
            console.error('Failed to fetch animal data:', error);
            alert('Failed to fetch animal data.');
        }
    };

    const fetchEnclosures = async () => {
        try {
            // Fetch the list of enclosures
            const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllEnclosures');
            setEnclosures(response.data);
        } catch (error) {
            console.error('Failed to fetch enclosures:', error);
            alert('Failed to fetch enclosures.');
        }
    };

    useEffect(() => {
        const fetchEnclosures = async () => {
            try {
                // Fetch the list of enclosures
                const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllEnclosures');
                console.log('Fetched enclosures:', response.data); // Debugging statement
                setEnclosures(response.data);
            } catch (error) {
                console.error('Failed to fetch enclosures:', error);
                alert('Failed to fetch enclosures.');
            }
        };
        fetchEnclosures(); // Fetch enclosures when the component loads
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Selected Enclosure ID:', selectedEnclosure); // Debugging statement
        
        // Construct the payload with updated enclosure ID
        const updateData = {
            animalID: animalData.animalID,
            enclosureID: selectedEnclosure
        };
    
        try {
            // Make the Axios call to update the animal's enclosure
            const response = await axios.put('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Animal/Transfer', updateData);
            console.log('Response from API:', response.data); // Debugging statement
            alert(response.data); // Assuming the backend sends a success message directly in response.data
        } catch (error) {
            console.error('Failed to update animal enclosure:', error);
            alert('Failed to add animal to the enclosure.');
        }
    };

    return (
        <div className="modify-animal-container">
            <h2>Assign Animal to Enclosure</h2>
            <form onSubmit={handleSubmit}>
                {/* Search form for original animal data */}
                <div className="form-group-animal">
                    <label htmlFor="searchName">Animal Name:</label>
                    <input
                        type="text"
                        id="searchName"
                        value={searchData.animalName}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalName: e.target.value
                        })}
                        required
                    />
                </div>
                <div className="form-group-animal">
                    <label htmlFor="searchSpecies">Animal Species:</label>
                    <input
                        type="text"
                        id="searchSpecies"
                        value={searchData.animalSpecies}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalSpecies: e.target.value
                        })}
                        required
                    />
                </div>
                <div className="form-group-animal">
                    <label htmlFor="searchDoB">Animal DoB:</label>
                    <input
                        type="date"
                        id="searchDoB"
                        value={searchData.animalDoB}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalDoB: e.target.value
                        })}
                        required
                    />
                </div>
                <button type="button" onClick={fetchAnimalData}>Search</button>

                {/* Form to select an enclosure, only shown after animal data is fetched */}
                {animalData.animalID && (
                    <>
                        <div className="form-group-animal">
                            <label htmlFor="enclosure">Choose an Enclosure:</label>
                            <select
                                id="enclosure"
                                value={selectedEnclosure}
                                onChange={(e) => setSelectedEnclosure(e.target.value)}
                                required
                            >
                                <option value="">-- Select an Enclosure --</option>
                                {enclosures.map((enclosure) => (
                                    <option key={enclosure.enclosure_id} value={enclosure.enclosure_id}>
                                        {enclosure.enclosure_name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <button type="submit">Add Animal to Enclosure</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default AddAnimalToEnclosure;
