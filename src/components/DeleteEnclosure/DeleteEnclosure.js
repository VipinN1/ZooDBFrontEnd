import React, { useState } from 'react';
import './DeleteEnclosure.css';
import axios from 'axios';

function DeleteEnclosure() {
    const [enclosureName, setEnclosureName] = useState('');
    const [enclosureType, setEnclosureType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Log the input values for debugging purposes
        console.log('Enclosure Name:', enclosureName);
        console.log('Enclosure Type:', enclosureType);

        // Ask for confirmation before deleting the enclosure
        const confirmed = window.confirm('Are you sure you want to delete this enclosure?');
        if (!confirmed) {
            // If the user does not confirm, do nothing
            return;
        }

        try {
            // Use axios to send a DELETE request with the enclosureName and enclosureType as parameters
            const response = await axios.delete('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/Enclosure/Delete', {
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
                    <input
                        type="text"
                        id="enclosureType"
                        value={enclosureType}
                        onChange={(e) => setEnclosureType(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}

export default DeleteEnclosure;
