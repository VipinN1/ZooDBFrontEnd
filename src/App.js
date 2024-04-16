import React, { useState,useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import CustomerNavbar from './components/Views/CustomerNavbar';
import EmployeeNavbar from './components/Views/EmployeeNavbar';
import ManagerNavbar from './components/Views/ManagerNavbar';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/SignUp/SignUp';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
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
import { Route, Routes, useNavigate} from 'react-router-dom';
import NavbarTemp from './components/Navbar/NavbarTemp';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [employeeId,setEmployeeId] = useState('');
  const [customerId,setCustomerId] = useState('');


  async function handleSignIn(email, password){
    // Here you can handle the submission logic, such as sending data to App.js
    

    console.log('Email:', email);
    console.log('Password:', password);



    const userData = {
      email: email,
      password: password,

    };


    try {
      const response = await axios.post('http://localhost:5095/api/ZooDb/ValidateUser', userData);
      //console.log('Response:', response.data.userType);
      if(response.data.userType === 'employee' ||  response.data.userType === 'manager'){
        setEmployeeId(response.data.employeeId);

      }
      else if(response.data.userType === 'customer'){
        setCustomerId(response.data.customerId);
      }
      setUserRole(response.data.userType);
      setLoggedIn(true);
      setUserEmail(email);
      if(response.data.userType === 'employee' ||  response.data.userType === 'manager' || response.data.userType === 'customer'){
      navigate('');
      }
  

      // Handle success scenario
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // The error is specifically an AxiosError
        console.error('Error data:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
      } else {
        // The error is not an AxiosError (could be a network error, etc.)
        console.error('Non-Axios error:', error);


      }
    }

    // Set loggedIn to true after successful login
  };

  const handleSignOut = () => {
    // Reset authentication status
    setLoggedIn(false);
    setUserRole('');
    // Navigate to sign-in page
    navigate('/sign-in');
  };



  return (
    <>
      <div className="container">
      {loggedIn ? (
        userRole === 'customer' ? <CustomerNavbar handleSignOut={handleSignOut} /> :
        userRole === 'employee' ? <EmployeeNavbar handleSignOut={handleSignOut} /> :
        userRole === 'manager' ? <ManagerNavbar handleSignOut={handleSignOut} /> :
  <     NavbarTemp />
      ) : (
        <NavbarTemp />
      )}
          <Routes>
          <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/ticket-buy" element={<TicketBuy customerId = {customerId} />} />
          <Route path="/ticket-view" element={<TicketView customerId = {customerId} />} />
          <Route path="/donation" element={<Donation customerId = {customerId}/>} />
          <Route path="/clock-in" element={<ClockIn employeeId = {employeeId} />} />
          <Route path="/veterinarian-record" element={<VeterinarianRecord />} />
          <Route path="/diet-entry" element={<DietForm />} />
          <Route path="/add-enclosure-form" element={<AddEnclosureForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-animal" element={<AddAnimal />} />
          <Route path="/add-security-form" element={<AddSecurityForm employeeId = {employeeId} />} />
          <Route path="/security-report" element={<SecurityReport />} />
          <Route path="/enclosure-report" element={<EnclosureReport />} />
          <Route path="/animal-report" element={<AnimalReport />} />
          <Route path="/business-report" element={<BusinessReport />} />
          <Route path ="/" element={<Home/>}/>
        </Routes> 
      </div>
    </>
  );
}

export default App;