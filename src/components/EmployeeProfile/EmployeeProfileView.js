import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeProfileView.css'; // Ensure correct CSS file is linked

function EmployeeProfileView({ employeeId }) {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log(employeeId);
    axios.get(`http://localhost:5095/api/ZooDb/GetEmployeeProfile?employeeId=${employeeId}`)
      .then(response => {
        console.log("Fetched data:", response.data); // Debugging line
        setEmployee(response.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching employee data:', err);
        setError('Failed to load employee data');
        console.log(err.response); // Additional debugging information
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [employeeId]);
  

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error loading profile: {error}</div>;
  }

  if (!employee) {
    return <div className="error">No employee data available.</div>;
  }

  // Handle default or null values effectively
  const formatDate = (date) => {
    const d = new Date(date);
    return d.getFullYear() > 1 ? d.toLocaleDateString() : 'N/A'; // Handling unreal dates
  };

  const formatSalary = (salary) => {
    return salary > 0 ? salary.toLocaleString() : 'Not Available'; // Handling zero salary
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Employee Profile</h1>
      <div className="profile-info">
        <p className="fade-in">👤 <strong>First Name:</strong> {employee.firstName || 'N/A'}</p>
        <p className="fade-in">👤 <strong>Last Name:</strong> {employee.lastName || 'N/A'}</p>
        <p className="fade-in">📅 <strong>Hire Date:</strong> {formatDate(employee.hireDate)}</p>
        <p className="fade-in">🎂 <strong>Date of Birth:</strong> {formatDate(employee.dob)}</p>
        <p className="fade-in">💰 <strong>Salary:</strong> {formatSalary(employee.salary)}</p>
        <p className="fade-in">📧 <strong>Email:</strong> {employee.email || 'N/A'}</p>
      </div>
    </div>
  );
}

export default EmployeeProfileView;