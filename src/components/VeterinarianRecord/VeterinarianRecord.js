import React, { useState } from 'react';
import axios from 'axios';
import './VeterinarianRecord.css'; // Import the CSS file

function VeterinarianRecord() {
    // State for search criteria
    const [searchData, setSearchData] = useState({
        animalName: '',
        animalSpecies: '',
        animalDoB: ''
    });

    // State for existing vet records and form inputs
    const [vetRecordData, setVetRecordData] = useState({
        weight: '',
        height: '',
        medications: '',
        diagnosis: ''
    });

    // State to check if vet records are fetched
    const [isVetRecordFetched, setIsVetRecordFetched] = useState(false);

    const fetchVetRecordData = async () => {
      try {
          // Log search criteria
          console.log('Fetching vet records with criteria:', searchData);
  
          const response = await axios.get('http://localhost:5095/api/ZooDb/GetVetRecords', {
              params: {
                  animalName: searchData.animalName,
                  animalSpecies: searchData.animalSpecies,
                  animalDoB: searchData.animalDoB
              }
          });
  
          const data = response.data;
  
          // Log response data
          console.log('Fetched vet records:', data);
  
          // Check if data was fetched
          if (data.length > 0) {
              const vetRecord = data[0];
              setVetRecordData({
                  weight: vetRecord.weight,
                  height: vetRecord.height,
                  medications: vetRecord.medications,
                  diagnosis: vetRecord.diagnosis
              });
  
              setIsVetRecordFetched(true);
          } else {
              alert('No vet records found for the specified animal.');
              setIsVetRecordFetched(false);
          }
      } catch (error) {
          console.error('Failed to fetch vet records:', error);
          if (error.response) {
              console.error('Response Data:', error.response.data);
              console.error('Response Status:', error.response.status);
              console.error('Response Headers:', error.response.headers);
              alert(`Failed to fetch vet records: ${error.response.data.message}`);
          } else {
              alert('Failed to fetch vet records. Check console for details.');
          }
      }
  };
  

    // Handle form submission to modify vet records
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the data to send in the request
        const data = {
            animalName: searchData.animalName,
            animalSpecies: searchData.animalSpecies,
            animalDoB: searchData.animalDoB,
            weight: vetRecordData.weight,
            height: vetRecordData.height,
            medications: vetRecordData.medications,
            diagnosis: vetRecordData.diagnosis
        };

        try {
            // Send the request to modify vet records
            const response = await axios.put('http://localhost:5095/api/ZooDb/Vet/Modify', data);
            console.log('Vet records updated:', response);
            alert('Vet records updated successfully.');
        } catch (error) {
            console.error('Failed to update vet records:', error);
            alert('Failed to update vet records.');
        }
    };

    return (
        <div className="veterinarian-records-container">
            <h2>Veterinarian Records</h2>
            <form onSubmit={handleSubmit}>
                {/* Search form for existing vet records */}
                <div className="form-group-vet">
                    <label className="label-vet" htmlFor="searchName">Animal Name:</label>
                    <input
                        type="text"
                        id="searchName"
                        className="input-vet"
                        value={searchData.animalName}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalName: e.target.value
                        })}
                        required
                    />
                </div>
                <div className="form-group-vet">
                    <label className="label-vet" htmlFor="searchSpecies">Animal Species:</label>
                    <input
                        type="text"
                        id="searchSpecies"
                        className="input-vet"
                        value={searchData.animalSpecies}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalSpecies: e.target.value
                        })}
                        required
                    />
                </div>
                <div className="form-group-vet">
                    <label className="label-vet" htmlFor="searchDoB">Animal DoB:</label>
                    <input
                        type="date"
                        id="searchDoB"
                        className="input-vet"
                        value={searchData.animalDoB}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            animalDoB: e.target.value
                        })}
                        required
                    />
                </div>
                <button className="button-vet" type="button" onClick={fetchVetRecordData}>Search</button>

                {/* Form fields to modify vet records, shown only if records are fetched */}
                {isVetRecordFetched && (
                    <>
                        <div className="form-group-vet">
                            <label className="label-vet" htmlFor="weight">Weight (lbs):</label>
                            <input
                                type="number"
                                id="weight"
                                className="input-vet"
                                value={vetRecordData.weight}
                                onChange={(e) => setVetRecordData({
                                    ...vetRecordData,
                                    weight: parseFloat(e.target.value)
                                })}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group-vet">
                            <label className="label-vet" htmlFor="height">Height (in):</label>
                            <input
                                type="number"
                                id="height"
                                className="input-vet"
                                value={vetRecordData.height}
                                onChange={(e) => setVetRecordData({
                                    ...vetRecordData,
                                    height: parseFloat(e.target.value)
                                })}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group-vet">
                            <label className="label-vet" htmlFor="medications">Medications:</label>
                            <textarea
                                id="medications"
                                className="input-vet"
                                value={vetRecordData.medications}
                                onChange={(e) => setVetRecordData({
                                    ...vetRecordData,
                                    medications: e.target.value
                                })}
                                placeholder="Enter medications separated by commas"
                                required
                            />
                        </div>
                        <div className="form-group-vet">
                            <label className="label-vet" htmlFor="diagnosis">Diagnosis:</label>
                            <textarea
                                id="diagnosis"
                                className="input-vet"
                                value={vetRecordData.diagnosis}
                                onChange={(e) => setVetRecordData({
                                    ...vetRecordData,
                                    diagnosis: e.target.value
                                })}
                                placeholder="Enter diagnosis"
                                required
                            />
                        </div>
                        <button className="button-vet" type="submit">Save Changes</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default VeterinarianRecord;
