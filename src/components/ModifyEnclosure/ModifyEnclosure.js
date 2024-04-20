import React, { useState } from 'react';
import axios from 'axios';
import './ModifyEnclosure.css';

function ModifyEnclosure() {
    // State variables for search data, original data, and updated data
    const [searchData, setSearchData] = useState({
        enclosureName: '',
        enclosureType: '',
    });

    const [originalEnclosureData, setOriginalEnclosureData] = useState({
        enclosureName: '',
        enclosureType: '',
        builtDate: '',
        cleaningScheduleStart: '',
        cleaningScheduleEnd: '',
    });

    const [updatedEnclosureData, setUpdatedEnclosureData] = useState({
        enclosureName: '',
        enclosureType: '',
        builtDate: '',
        cleaningScheduleStart: '',
        cleaningScheduleEnd: '',
    });

    const [isEnclosureFetched, setIsEnclosureFetched] = useState(false);

    // Fetches the enclosure data from the server based on search criteria
    const fetchEnclosureData = async () => {
        try {
            const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Enclosure/Get', {
                params: {
                    enclosureName: searchData.enclosureName,
                    enclosureType: searchData.enclosureType,
                }
            });

            const data = response.data;
            const formattedDate = data.builtDate.split('T')[0];
            const formattedCleaningStart = data.cleaningScheduleStart.split(':').slice(0, 2).join(':');
            const formattedCleaningEnd = data.cleaningScheduleEnd.split(':').slice(0, 2).join(':');

            // Update original and updated data states with fetched data
            const fetchedEnclosureData = {
                enclosureName: data.enclosureName,
                enclosureType: data.enclosureType,
                builtDate: formattedDate,
                cleaningScheduleStart: formattedCleaningStart,
                cleaningScheduleEnd: formattedCleaningEnd,
            };
            
            setOriginalEnclosureData(fetchedEnclosureData);
            setUpdatedEnclosureData(fetchedEnclosureData);
            setIsEnclosureFetched(true);
        } catch (error) {
            console.error('Failed to fetch enclosure data:', error);
            alert('Failed to fetch enclosure data.');
            setIsEnclosureFetched(false);
        }
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            OriginalEnclosure: originalEnclosureData,
            UpdatedEnclosure: updatedEnclosureData,
        };

        try {
            const response = await axios.put('http://localhost:5095/api/ZooDb/Enclosure/Modify', requestData);
            console.log('Enclosure updated:', response);
            alert('Enclosure details updated successfully.');
        } catch (error) {
            console.error('Failed to update enclosure:', error);
            alert('Failed to update enclosure.');
        }
    };

    return (
        <div className="modify-enclosure-container">
            <h2>Modify Enclosure</h2>
            <form onSubmit={handleSubmit}>
                {/* Search Criteria Form */}
                <div className="form-group">
                    <label htmlFor="searchName">Enclosure Name:</label>
                    <input
                        type="text"
                        id="searchName"
                        value={searchData.enclosureName}
                        onChange={(e) => setSearchData({ ...searchData, enclosureName: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="searchType">Enclosure Type:</label>
                    <input
                        type="text"
                        id="searchType"
                        value={searchData.enclosureType}
                        onChange={(e) => setSearchData({ ...searchData, enclosureType: e.target.value })}
                        required
                    />
                </div>
                <button type="button" onClick={fetchEnclosureData}>Search</button>

                {/* Only show form fields and save button if enclosure data has been fetched */}
                {isEnclosureFetched && (
                    <>
                        {/* Modify Enclosure Form */}
                        <div className="form-group">
                            <label htmlFor="enclosureName">Enclosure Name:</label>
                            <input
                                type="text"
                                id="enclosureName"
                                value={updatedEnclosureData.enclosureName}
                                onChange={(e) => setUpdatedEnclosureData({ ...updatedEnclosureData, enclosureName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="enclosureType">Enclosure Type:</label>
                            <input
                                type="text"
                                id="enclosureType"
                                value={updatedEnclosureData.enclosureType}
                                onChange={(e) => setUpdatedEnclosureData({ ...updatedEnclosureData, enclosureType: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="builtDate">Built Date:</label>
                            <input
                                type="date"
                                id="builtDate"
                                value={updatedEnclosureData.builtDate}
                                onChange={(e) => setUpdatedEnclosureData({ ...updatedEnclosureData, builtDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cleaningScheduleStart">Cleaning Schedule Start:</label>
                            <input
                                type="time"
                                id="cleaningScheduleStart"
                                value={updatedEnclosureData.cleaningScheduleStart}
                                onChange={(e) => setUpdatedEnclosureData({ ...updatedEnclosureData, cleaningScheduleStart: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cleaningScheduleEnd">Cleaning Schedule End:</label>
                            <input
                                type="time"
                                id="cleaningScheduleEnd"
                                value={updatedEnclosureData.cleaningScheduleEnd}
                                onChange={(e) => setUpdatedEnclosureData({ ...updatedEnclosureData, cleaningScheduleEnd: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Save Changes</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default ModifyEnclosure;
