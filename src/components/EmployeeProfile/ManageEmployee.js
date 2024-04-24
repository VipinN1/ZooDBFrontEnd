import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEmployees.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ lastName: '', firstName: '', hireDate: '', dob: '', salary: '', email: '', phoneNumber: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/GetEmployees');
    setEmployees(response.data);
  };

  const addEmployee = async (event) => {
    event.preventDefault();
    const url = 'https://zoodatabasebackend.azurewebsites.net/api/ZooDb/AddEmployee';
    await axios.post(url, form, {
      params: { password: form.password } // Pass password as a query parameter
    });
    fetchEmployees();
    setForm({
      lastName: '',
      firstName: '',
      hireDate: '',
      dob: '',
      salary: '',
      email: '',
      phoneNumber: '',
      password: '',
    });
  };

  const updateEmployee = async (event) => {
    event.preventDefault();
    await axios.put('https://zoodatabasebackend.azurewebsites.net/api/ZooDb/UpdateEmployee', form);
    setEditing(false);
    fetchEmployees();
    setForm({ empId: '', lastName: '', firstName: '', hireDate: '', dob: '', salary: '', email: '', phoneNumber: '' });
  };

  const deleteEmployee = async (email) => {
    if(window.confirm('Are you sure you want to delete this employee?')) {
      await axios.delete(`https://zoodatabasebackend.azurewebsites.net/api/ZooDb/DeleteEmployee`, { params: { email } });
      fetchEmployees();
    }
  };

  const editEmployee = (employee) => {
    setEditing(true);
    setForm({ ...employee });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1>Manage Employees</h1>
      <form onSubmit={editing ? updateEmployee : addEmployee}>
        {editing && <input type="hidden" value={form.empId} name="empId" />}
        <label>Last Name:
          <input name="lastName" type="text" value={form.lastName} onChange={handleInputChange} required />
        </label>
        <label>First Name:
          <input name="firstName" type="text" value={form.firstName} onChange={handleInputChange} required />
        </label>
        <label>Hire Date:
          <input name="hireDate" type="date" value={form.hireDate} onChange={handleInputChange} required />
        </label>
        <label>DOB:
          <input name="dob" type="date" value={form.dob} onChange={handleInputChange} required />
        </label>
        <label>Salary:
          <input name="salary" type="number" value={form.salary} onChange={handleInputChange} required />
        </label>
        <label>Email:
          <input name="email" type="email" value={form.email} onChange={handleInputChange} required />
        </label>
        <label>Phone Number:
          <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleInputChange} required />
        </label>
        <button type="submit">{editing ? 'Update Employee' : 'Add Employee'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Hire Date</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.last_name}</td>
              <td>{employee.first_name}</td>
              <td>{employee.hire_date}</td>
              <td>{employee.emp_DoB}</td>
              <td>{employee.salary}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>
                <button onClick={() => editEmployee(employee)}>Edit</button>
                <button onClick={() => deleteEmployee(employee.email)} className="delete-btn">Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
