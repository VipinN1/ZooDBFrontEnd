import React, { useState, useEffect } from 'react';
import './EnclosureReport.css';
import axios from 'axios';

function EnclosureReport() {
    const [enclosureName, setEnclosureName] = useState(''); // State for enclosure name
    const [enclosureType, setEnclosureType] = useState(''); // State for enclosure type
    const [dateRange, setDateRange] = useState({ start: '', end: '' }); // State for date range
    const [timeRange, setTimeRange] = useState({ start: '', end: '' }); // State for time range
    const [reportData, setReportData] = useState([]); // State for report data

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Send a POST request to the backend to fetch report data based on filters
            const response = await axios.post(
                'http://localhost:5095/api/ZooDb/GenerateEnclosureReport',
                {
                    enclosureName: enclosureName,
                    enclosureType: enclosureType,
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

            // Set the report data based on the response from the backend
            setReportData(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Server responded with:', error.response.status);
                console.error('Response data:', error.response.data);
                
                // Check if errors exist in the response
                if (error.response.data && error.response.data.errors) {
                    console.error('Validation errors:', error.response.data.errors);
                }
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    // Helper function to format time as 'HH:mm' (24-hour format without seconds)
    const formatTime = (timeString) => {
        const time = new Date(`1970-01-01T${timeString}Z`);
        const hours = time.getUTCHours().toString().padStart(2, '0');
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className="enclosure-report-container">
            <h2 className="enclosure-report-title">Zoo Enclosure Report</h2>
            <form onSubmit={handleFormSubmit} className="enclosure-report-form">
                <label htmlFor="enclosureName" className="enclosure-name-label">Enclosure Name:</label>
                <input
                    type="text"
                    id="enclosureName"
                    value={enclosureName}
                    onChange={(event) => setEnclosureName(event.target.value)}
                    className="enclosure-name-input"
                />

                <label htmlFor="enclosureType" className="enclosure-type-label">Enclosure Type:</label>
                <select
                    id="enclosureType"
                    value={enclosureType}
                    onChange={(event) => setEnclosureType(event.target.value)}
                    className="enclosure-type-input"
                >
                    <option value="">-- Select Enclosure Type --</option>
                    <option value="Forest">Forest</option>
                    <option value="Aquatic">Aquatic</option>
                    <option value="Reptile">Reptile</option>
                    {/* Add more options as needed */}
                </select>

                <label htmlFor="dateRangeStart" className="date-range-label">Built Date Range:</label>
                <input
                    type="date"
                    id="dateRangeStart"
                    value={dateRange.start}
                    onChange={(event) => setDateRange({ ...dateRange, start: event.target.value })}
                    className="date-range-input"
                />
                <input
                    type="date"
                    id="dateRangeEnd"
                    value={dateRange.end}
                    onChange={(event) => setDateRange({ ...dateRange, end: event.target.value })}
                    className="date-range-input"
                />

                <label htmlFor="timeRangeStart" className="time-range-label">Cleaning Schedule Time Range:</label>
                <input
                    type="time"
                    id="timeRangeStart"
                    value={timeRange.start}
                    onChange={(event) => setTimeRange({ ...timeRange, start: event.target.value })}
                    className="time-range-input"
                />
                <input
                    type="time"
                    id="timeRangeEnd"
                    value={timeRange.end}
                    onChange={(event) => setTimeRange({ ...timeRange, end: event.target.value })}
                    className="time-range-input"
                />

                <button type="submit" className="generate-report-button">Generate Report</button>
            </form>

            {/* Display the report data in a table */}
            {reportData.length > 0 && (
                <div className="report-data">
                    <h3>Enclosure Cleaning Times:</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Enclosure ID</th>
                                <th>Enclosure Name</th>
                                <th>Built Date</th>
                                <th>Cleaning Schedule Start</th>
                                <th>Cleaning Schedule End</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((enclosure, index) => (
                                <tr key={index}>
                                    <td>{enclosure.enclosureID}</td>
                                    <td>{enclosure.enclosureName}</td>
                                    <td>{enclosure.builtDate.split('T')[0]}</td> {/* Format date */}
                                    <td>{formatTime(enclosure.cleaningScheduleStart)}</td>
                                    <td>{formatTime(enclosure.cleaningScheduleEnd)}</td>
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
