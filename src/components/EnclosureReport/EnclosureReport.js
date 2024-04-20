import React, { useState, useEffect } from 'react';
import './EnclosureReport.css';
import axios from 'axios';

function EnclosureReport() {
    const [enclosures, setEnclosures] = useState([]); // State for enclosures data
    const [enclosureName, setEnclosureName] = useState('');
    const [enclosureType, setEnclosureType] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [timeRange, setTimeRange] = useState({ start: '', end: '' });
    const [uniqueEnclosureTypes, setUniqueEnclosureTypes] = useState([]); // State for unique enclosure types

    // Fetch unique enclosure types
    const fetchUniqueEnclosureTypes = async () => {
        try {
            const response = await axios.get(
                'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetUniqueEnclosureTypes'
            );
            // Set the unique enclosure types to the state
            setUniqueEnclosureTypes(response.data);
        } catch (error) {
            console.error('Error fetching unique enclosure types:', error);
        }
    };

    // Use effect to fetch unique enclosure types on component mount
    useEffect(() => {
        fetchUniqueEnclosureTypes();
    }, []);

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // First, fetch enclosures based on the current filter parameters
        try {
            const response = await axios.post(
                'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GenerateEnclosureReport',
                {
                    enclosureName,
                    enclosureType,
                    dateRangeStart: dateRange.start,
                    dateRangeEnd: dateRange.end,
                    timeRangeStart: timeRange.start,
                    timeRangeEnd: timeRange.end,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Store the enclosures data in state
            const enclosuresData = response.data;

            // Next, fetch animals for each enclosure
            const updatedEnclosures = await Promise.all(
                enclosuresData.map(async (enclosure) => {
                    const animalsData = await fetchAnimalsForEnclosure(enclosure.enclosureID);
                    return { ...enclosure, animals: animalsData };
                })
            );

            // Update the state with the enclosures including the animals data
            setEnclosures(updatedEnclosures);
        } catch (error) {
            console.error('Error fetching enclosures:', error);
        }
    };

    // Fetch animals for a specific enclosure
    const fetchAnimalsForEnclosure = async (enclosureID) => {
        try {
            const response = await axios.get(
                `https://zoodatabasebackend.azurewebsites.net/api/ZooDb/FetchAnimalsForEnclosure/${enclosureID}`
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching animals for enclosure ${enclosureID}:`, error);
            return [];
        }
    };

    // Function to convert time to 12-hour format without seconds
    const formatTimeTo12Hour = (time) => {
        const date = new Date(`1970-01-01T${time}Z`);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleTimeString([], options);
    };

    return (
        <div className="enclosure-report-container">
            <h2 className="enclosure-report-title">Zoo Enclosure Report</h2>
            <form onSubmit={handleFormSubmit} className="enclosure-report-form">
                {/* Form inputs */}
                <div className="form-group">
                    <label htmlFor="enclosureName" className="enclosure-name-label">Enclosure Name:</label>
                    <input
                        type="text"
                        id="enclosureName"
                        value={enclosureName}
                        onChange={(event) => setEnclosureName(event.target.value)}
                        className="input"
                    />
                </div>

                {/* Enclosure type dropdown */}
                <div className="form-group">
                    <label htmlFor="enclosureType" className="enclosure-type-label">Enclosure Type:</label>
                    <select
                        id="enclosureType"
                        value={enclosureType}
                        onChange={(event) => setEnclosureType(event.target.value)}
                        className="input"
                    >
                        <option value="">-- Select Enclosure Type --</option>
                        {uniqueEnclosureTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date range inputs */}
                <div className="form-group">
                    <label htmlFor="dateRangeStart" className="date-range-label">Built Date Range:</label>
                    <input
                        type="date"
                        id="dateRangeStart"
                        value={dateRange.start}
                        onChange={(event) => setDateRange({ ...dateRange, start: event.target.value })}
                        className="input"
                    />
                    <input
                        type="date"
                        id="dateRangeEnd"
                        value={dateRange.end}
                        onChange={(event) => setDateRange({ ...dateRange, end: event.target.value })}
                        className="input"
                    />
                </div>

                {/* Time range inputs */}
                <div className="form-group">
                    <label htmlFor="timeRangeStart" className="time-range-label">Cleaning Schedule Time Range:</label>
                    <input
                        type="time"
                        id="timeRangeStart"
                        value={timeRange.start}
                        onChange={(event) => setTimeRange({ ...timeRange, start: event.target.value })}
                        className="input"
                    />
                    <input
                        type="time"
                        id="timeRangeEnd"
                        value={timeRange.end}
                        onChange={(event) => setTimeRange({ ...timeRange, end: event.target.value })}
                        className="input"
                    />
                </div>

                <button type="submit" className="submit-button">Generate Report</button>
            </form>

            {/* Display enclosures and animals */}
            {enclosures.length > 0 && (
                <div className="report-data">
                    <h3>Enclosures:</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Enclosure Name</th>
                                <th>Enclosure Type</th>
                                <th>Built Date</th>
                                <th>Cleaning Schedule Start</th>
                                <th>Cleaning Schedule End</th>
                                <th>Animals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enclosures.map((enclosure, index) => (
                                <tr key={index}>
                                    <td>{enclosure.enclosureName}</td>
                                    <td>{enclosure.enclosureType}</td>
                                    <td>{enclosure.builtDate.split('T')[0]}</td>
                                    <td>{formatTimeTo12Hour(enclosure.cleaningScheduleStart)}</td>
                                    <td>{formatTimeTo12Hour(enclosure.cleaningScheduleEnd)}</td>
                                    <td>
                                        {/* Display animals within each enclosure */}
                                        <ul>
                                            {enclosure.animals && enclosure.animals.map((animal, index) => (
                                                <li key={index}>
                                                    {animal.animalName} ({animal.animalSpecies})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EnclosureReport;
