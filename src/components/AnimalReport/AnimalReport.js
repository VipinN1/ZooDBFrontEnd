import React, { useState, useEffect } from 'react';
import './AnimalReport.css';
import axios from 'axios';

function AnimalReport() {
    // State for form fields
    const [animalSpecies, setAnimalSpecies] = useState('');
    const [dietType, setDietType] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [reportType, setReportType] = useState('animal');
    const [reportData, setReportData] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false); // Track if report has been generated
    const [allAnimalSpecies, setAllAnimalSpecies] = useState([]); // State to hold all animal species

    // Fetch all animal species when component mounts
    useEffect(() => {
        async function fetchAllAnimalSpecies() {
            try {
                const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAllAnimalSpecies');
                // Extracting species names from the response
                const speciesNames = response.data.map(item => item.animal_species);
                setAllAnimalSpecies(speciesNames);
            } catch (error) {
                console.error('Error fetching animal species:', error);
            }
        }

        fetchAllAnimalSpecies();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsGenerating(true);

        // Adjusting fields to send null if blank
        const adjustedData = {
            animalSpecies: animalSpecies || null,
            dietType: dietType || null,
            diagnosis: diagnosis || null,
        };

        console.log('Request Data:', adjustedData);

        try {
            const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetAnimalReport', { params: adjustedData });
            const data = response.data;

            console.log('Response Data:', data);

            if (!data || data.length === 0) {
                alert('No data found!');
                setReportData([]);
                return;
            }

            setReportData(data);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data!');
        } finally {
            setIsGenerating(false);
            setReportGenerated(true); // Set reportGenerated to true after generating the report
        }
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
        setReportGenerated(false); // Reset reportGenerated when dropdown changes
    };

    return (
        <div className="animal-report-container">
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                <h2>Animal Report</h2>
                    <label htmlFor="animalSpecies">Animal Species:</label>
                    <select
                        id="animalSpecies"
                        value={animalSpecies}
                        onChange={(e) => setAnimalSpecies(e.target.value)}
                        className="input"
                    >
                        <option value="">Select Animal Species</option>
                        {allAnimalSpecies.map((species, index) => (
                            <option key={index} value={species}>{species}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="dietType">Diet Type:</label>
                    <select
                        id="dietType"
                        value={dietType}
                        onChange={(e) => setDietType(e.target.value)}
                        className="input"
                    >
                        <option value="">Select Diet Type</option>
                        <option value="carnivore">Carnivore</option>
                        <option value="herbivore">Herbivore</option>
                        <option value="omnivore">Omnivore</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="diagnosis">Diagnosis:</label>
                    <input
                        type="text"
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reportType">Report Type:</label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={handleReportTypeChange}
                        className="input"
                    >
                        <option value="animal">Animal</option>    
                        <option value="diet">Diet</option>
                        <option value="vet">Vet Records</option>
                    </select>
                </div>
                <button type="submit" className="submit-button" disabled={isGenerating}>
                    Generate Report
                </button>
            </form>

            {/* Display report data if available and if reportGenerated is true */}
            {reportData.length > 0 && reportGenerated && (
                <div className="report-data">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Species</th>
                                {reportType === 'animal' && (
                                    <>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Endangered</th>
                                        <th>Date of Arrival</th>
                                        <th>Origin</th>
                                    </>
                                )}
                                {reportType === 'diet' && (
                                    <>
                                        <th>Diet Name</th>
                                        <th>Diet Type</th>
                                        <th>Diet Schedule</th>
                                    </>
                                )}
                                {reportType === 'vet' && (
                                    <>
                                        <th>Weight</th>
                                        <th>Height</th>
                                        <th>Diagnosis</th>
                                        <th>Medications</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.animal_name}</td>
                                    <td>{item.animal_species}</td>
                                    {reportType === 'animal' && (
                                        <>
                                            <td>{new Date(item.animal_DoB).toLocaleDateString()}</td>
                                            <td>{item.animal_gender}</td>
                                            <td>{item.animal_endangered ? 'Yes' : 'No'}</td>
                                            <td>{new Date(item.animal_DoA).toLocaleDateString()}</td>
                                            <td>{item.animal_origin}</td>
                                        </>
                                    )}
                                    {reportType === 'diet' && (
                                        <>
                                            <td>{item.diet_name}</td>
                                            <td>{item.diet_type}</td>
                                            <td>{item.diet_schedule}</td>
                                        </>
                                    )}
                                    {reportType === 'vet' && (
                                        <>
                                            <td>{item.weight}</td>
                                            <td>{item.height}</td>
                                            <td>{item.diagnosis}</td>
                                            <td>{item.medications}</td>
                                        </>
                                    )}
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
