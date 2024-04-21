import React, { useState, useEffect } from 'react';
import './DeleteEnclosure.css';
import axios from 'axios';

function DeleteEnclosure() {
    const [enclosureName, setEnclosureName] = useState('');
    const [enclosureType, setEnclosureType] = useState('');
    const [enclosureTypes, setEnclosureTypes] = useState([]);

    useEffect(() => {
        const fetchEnclosureTypes = async () => {
            try {
                const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetUniqueEnclosureTypes');
                setEnclosureTypes(response.data);
            } catch (error) {
                console.error('Failed to fetch enclosure types:', error);
                alert('Failed to fetch enclosure types.');
            }
        };

        fetchEnclosureTypes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete this enclosure?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await axios.delete('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Enclosure/Delete', {
                params: {
                    enclosureName,
                    enclosureType,
                },
            });

            console.log('Enclosure deleted:', response);
            
            // Handle success scenario
            alert('Enclosure deleted successfully.');
            
            setEnclosureName('');
            setEnclosureType('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error data:', error.response?.data);
                console.error('Error status:', error.response?.status);
                console.error('Error headers:', error.response?.headers);
                
                if (error.response?.status === 404) {
                    alert('No such enclosure found.'); 
                    return;
                }
            } else {
                console.error('Non-Axios error:', error);
            }
            alert('Failed to delete enclosure.');
        }
    };

    return (
        <div className="delete-enclosure-container">
            <h2>Delete Enclosure</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group-enclosure">
                    <label htmlFor="enclosureName">Enclosure Name:</label>
                    <input
                        type="text"
                        id="enclosureName"
                        value={enclosureName}
                        onChange={(e) => setEnclosureName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-enclosure">
                    <label htmlFor="enclosureType">Enclosure Type:</label>
                    <select
                        id="enclosureType"
                        value={enclosureType}
                        onChange={(e) => setEnclosureType(e.target.value)}
                        required
                    >
                        <option value="">Select Enclosure Type</option>
                        {enclosureTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}

export default DeleteEnclosure;