.animal-report-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #1f6f78;
  margin-top: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.animal-report-container h2 {
  text-align: center;
}

.animal-report-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: white; 
}

.animal-report-form {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center form elements */
}

.animal-species-label,
.animal-species-input,
.generate-report-button {
  margin-bottom: 10px;
  width: 100%; 
}

.animal-species-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.generate-report-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #004445;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.generate-report-button:hover {
  background-color: #062925;
}

/* Table styles */
.report-data {
  margin-top: 20px; /* Add space between the form and the table */
}

.report-table {
  width: 100%; 
  margin: 0 auto;
  border-collapse: collapse; 
  background-color: #f1f1f1; 
}

.report-table th,
.report-table td {
  padding: 10px; /* Add padding to cells */
  border: 1px solid #ccc; /* Add border to cells */
}

.report-table th {
  background-color: #004445; /* Darker background for headers */
  color: white; /* White text color for headers */
  font-weight: bold; /* Make headers bold */
}

.report-table tr:nth-child(even) {
  background-color: #e6f7f8; /* Light blue color for even rows */
}

.report-table tr:nth-child(odd) {
  background-color: #ffffff; /* White color for odd rows */
}
