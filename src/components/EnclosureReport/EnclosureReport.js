import React, { useState, useEffect } from 'react';
import './EnclosureReport.css';
import axios from 'axios';

function EnclosureReport() {
    const [enclosures, setEnclosures] = useState([]); 
    const [enclosureName, setEnclosureName] = useState('');
    const [enclosureType, setEnclosureType] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [timeRange, setTimeRange] = useState({ start: '', end: '' });
    const [uniqueEnclosureTypes, setUniqueEnclosureTypes] = useState([]); 

    const fetchUniqueEnclosureTypes = async () => {
        try {
            const response = await axios.get(
                'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllEnclosureTypes'
            );
            setUniqueEnclosureTypes(response.data);
        } catch (error) {
            console.error('Error fetching unique enclosure types:', error);
        }
    };

    // Function to format time to 12-hour format without seconds
    const formatTimeTo12Hour = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${period}`;
    };

    useEffect(() => {
        fetchUniqueEnclosureTypes();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        //  fetch enclosures based on the current filter parameters
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

            //  fetch animals for each enclosure
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

                <div className="form-group">
                    <label htmlFor="enclosureType" className="enclosure-type-label">Enclosure Type:</label>
                    <select
                        id="enclosureType"
                        value={enclosureType}
                        onChange={(event) => setEnclosureType(event.target.value)}
                        className="input"
                    >
                        <option value="">-- Select Enclosure Type --</option>
                        {uniqueEnclosureTypes.map((enclosure, index) => (
                            <option key={index} value={enclosure.enclosure_type}>
                                {enclosure.enclosure_type}
                            </option>
                        ))}
                    </select>
                </div>


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
