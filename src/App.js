import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import CustomerNavbar from './components/Views/CustomerNavbar';
import EmployeeNavbar from './components/Views/EmployeeNavbar';
import ManagerNavbar from './components/Views/ManagerNavbar';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/SignUp/SignUp';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import CustomerProfileUpdate from './components/CustomerProfile/CustomerProfileUpdate';
import CustomerProfileView from './components/CustomerProfile/CustomerProfileView';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';
import TicketBuy from './components/TicketBuy/TicketBuy';
import TicketView from './components/TicketView/TicketView';
import Donation from './components/Donation/Donation';
import ClockIn from './components/ClockIn/ClockIn';
import VeterinarianRecord from './components/VeterinarianRecord/VeterinarianRecord';
import DietForm from './components/DietForm/DietForm';
import Orders from './components/Orders/Orders';
import AddAnimal from './components/AddAnimal/AddAnimal';
import AddEnclosureForm from './components/AddEnclosureForm/AddEnclosureForm';
import AddSecurityForm from './components/AddSecurityForm/AddSecurityForm';
import SecurityReport from './components/SecurityReport/SecurityReport';
import EnclosureReport from './components/EnclosureReport/EnclosureReport';
import AnimalReport from './components/AnimalReport/AnimalReport';
import BusinessReport from './components/BusinessReport/BusinessReport';
import './App.css';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [customerId, setCustomerId] = useState('');

  async function handleSignIn(email, password) {
    console.log('Email:', email);
    console.log('Password:', password);

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5095/api/ZooDb/ValidateUser', userData);
      if (response.data.userType === 'employee' || response.data.userType === 'manager') {
        setEmployeeId(response.data.employeeId);
      } else if (response.data.userType === 'customer') {
        setCustomerId(response.data.customerId);
      }
      setUserRole(response.data.userType);
      setLoggedIn(true);
      setUserEmail(email);
      navigate('/'); // This ensures redirection to the home page after login
    } catch (error) {
      console.error('Error handling sign in:', error);
    }
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    setUserRole('');
    navigate('/sign-in'); // Redirect to the sign-in page on sign out
  };

  return (
    <div className="container">
      {loggedIn ? (
        userRole === 'customer' ? <CustomerNavbar handleSignOut={handleSignOut} /> :
        userRole === 'employee' ? <EmployeeNavbar handleSignOut={handleSignOut} /> :
        userRole === 'manager' ? <ManagerNavbar handleSignOut={handleSignOut} /> :
        <Navbar />
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/customer-profile-update" element={<CustomerProfileUpdate customerId={customerId}/>} />
        <Route path="/customer-profile-view" element={<CustomerProfileView customerId={customerId}/>} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/ticket-buy" element={<TicketBuy customerId={customerId} />} />
        <Route path="/ticket-view" element={<TicketView customerId={customerId} />} />
        <Route path="/donation" element={<Donation customerId={customerId} />} />
        <Route path="/clock-in" element={<ClockIn employeeId={employeeId} />} />
        <Route path="/veterinarian-record" element={<VeterinarianRecord />} />
        <Route path="/diet-entry" element={<DietForm />} />
        <Route path="/add-enclosure-form" element={<AddEnclosureForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/add-security-form" element={<AddSecurityForm employeeId={employeeId} />} />
        <Route path="/security-report" element={<SecurityReport />} />
        <Route path="/enclosure-report" element={<EnclosureReport />} />
        <Route path="/animal-report" element={<AnimalReport />} />
        <Route path="/business-report" element={<BusinessReport />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
