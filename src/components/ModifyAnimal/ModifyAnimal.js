import React, { useState } from 'react';
import './ModifyAnimal.css';
import axios from 'axios';

function ModifyAnimal() {
    const [searchData, setSearchData] = useState({
        animalName: '',
        animalSpecies: '',
        animalDoB: ''
    });
    const [originalAnimalData, setOriginalAnimalData] = useState({
        animalName: '',
        animalSpecies: '',
        animalGender: '',
        animalDoB: '',
        animalEndangered: false,
        animalOrigin: ''
    });
    const [updatedAnimalData, setUpdatedAnimalData] = useState({
        animalName: '',
        animalSpecies: '',
        animalGender: 'M',
        animalDoB: '',
        animalEndangered: false,
        animalOrigin: ''
    });
    const [isAnimalFetched, setIsAnimalFetched] = useState(false);

    const fetchAnimalData = async () => {
        try {
            // Use the searchData to fetch the animal data
            const response = await axios.get(`http://localhost:5095/api/ZooDb/Animal/Get`, {
                params: {
                    animalName: searchData.animalName,
                    animalSpecies: searchData.animalSpecies,
                    animalDoB: searchData.animalDoB
                }
            });

            const data = response.data;
            
            // Extract date part and remove time part from date of birth
            const formattedDoB = data.animalDoB.split('T')[0];

            // Update state with fetched data
            setOriginalAnimalData({
                animalName: data.animalName,
                animalSpecies: data.animalSpecies,
                animalGender: data.animalGender,
                animalDoB: formattedDoB,
                animalEndangered: data.animalEndangered,
                animalOrigin: data.animalOrigin
            });

            // Initialize updatedAnimalData with the original animal data
            setUpdatedAnimalData({
                animalName: data.animalName,
                animalSpecies: data.animalSpecies,
                animalGender: data.animalGender,
                animalDoB: formattedDoB,
                animalEndangered: data.animalEndangered,
                animalOrigin: data.animalOrigin
            });

            setIsAnimalFetched(true); // Show form fields and save button

        } catch (error) {
            console.error('Failed to fetch animal data:', error);
            alert('Failed to fetch animal data.');
            setIsAnimalFetched(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Combine originalAnimalData and updatedAnimalData into a single object
        const combinedData = {
            originalAnimal: originalAnimalData,
            updatedAnimal: updatedAnimalData
        };

        try {
            // Use combinedData as the payload for the update request
            console.log('Combined Data:', combinedData);
            const response = await axios.put('http://localhost:5095/api/ZooDb/Animal/Modify', combinedData);
            console.log('Animal updated:', response);
            alert('Animal details updated successfully.');
        } catch (error) {
            // Handle errors as before
            console.error('Failed to update animal data:', error);
            alert('Failed to update animal details.');
        }
    };

    return (
        <div className="modify-animal-container">
            <h2>Modify Animal</h2>
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

                {/* Form fields for updating animal data, shown only after fetching animal data */}
                {isAnimalFetched && (
                    <>
                        <div className="form-group-animal">
                            <label htmlFor="animalName">Animal Name:</label>
                            <input
                                type="text"
                                id="animalName"
                                value={updatedAnimalData.animalName}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalName: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group-animal">
                            <label htmlFor="animalSpecies">Animal Species:</label>
                            <input
                                type="text"
                                id="animalSpecies"
                                value={updatedAnimalData.animalSpecies}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalSpecies: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group-animal">
                            <label htmlFor="animalGender">Animal Gender:</label>
                            <select
                                id="animalGender"
                                value={updatedAnimalData.animalGender}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalGender: e.target.value
                                })}
                                required
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div className="form-group-animal">
                            <label htmlFor="animalDoB">Animal DoB:</label>
                            <input
                                type="date"
                                id="animalDoB"
                                value={updatedAnimalData.animalDoB}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalDoB: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group-animal">
                            <label htmlFor="animalEndangered">Is Animal Endangered?</label>
                            <select
                                id="animalEndangered"
                                value={updatedAnimalData.animalEndangered ? 'Yes' : 'No'}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalEndangered: e.target.value === 'Yes'
                                })}
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
                                value={updatedAnimalData.animalOrigin}
                                onChange={(e) => setUpdatedAnimalData({
                                    ...updatedAnimalData,
                                    animalOrigin: e.target.value
                                })}
                                required
                            />
                        </div>
                        {/* Add other form fields here */}
                        <button type="submit">Save Changes</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default ModifyAnimal;
