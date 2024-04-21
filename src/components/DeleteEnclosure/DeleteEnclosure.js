import React, { useState, useEffect } from 'react';
import './DeleteEnclosure.css';
import axios from 'axios';

function DeleteEnclosure() {
    const [enclosureName, setEnclosureName] = useState('');
    const [enclosureType, setEnclosureType] = useState('');
    const [enclosureTypes, setEnclosureTypes] = useState([]);

    // Fetch unique enclosure types from the backend when the component mounts
    useEffect(() => {
        const fetchEnclosureTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5095/api/ZooDb/GetUniqueEnclosureTypes');
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

        // Ask for confirmation before deleting the enclosure
        const confirmed = window.confirm('Are you sure you want to delete this enclosure?');
        if (!confirmed) {
            // If the user does not confirm, do nothing
            return;
        }

        try {
            // Use axios to send a DELETE request with the enclosureName and enclosureType as parameters
            const response = await axios.delete('http://localhost:5095/api/ZooDb/Enclosure/Delete', {
                params: {
                    enclosureName,
                    enclosureType,
                },
            });

            // Log the response for debugging purposes
            console.log('Enclosure deleted:', response);
            
            // Handle success scenario
            alert('Enclosure deleted successfully.');
            
            // Clear input fields after deletion
            setEnclosureName('');
            setEnclosureType('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error data:', error.response?.data);
                console.error('Error status:', error.response?.status);
                console.error('Error headers:', error.response?.headers);
                
                // Check if the error status is 404 (Not Found), indicating that the enclosure does not exist
                if (error.response?.status === 404) {
                    alert('No such enclosure found.'); // Alert for enclosure not found
                    return; // Prevent further execution
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