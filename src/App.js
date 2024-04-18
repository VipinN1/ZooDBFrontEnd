import React, { useState, useEffect } from 'react';
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
import VeterinarianRecord from './components/VeterinarianRecord/VeterinarianRecord';
import DietForm from './components/DietForm/DietForm';
import Orders from './components/Orders/Orders';
import AddAnimal from './components/AddAnimal/AddAnimal';
import AddEnclosureForm from './components/AddEnclosureForm/AddEnclosureForm';
import ModifyEnclosure from './components/ModifyEnclosure/ModifyEnclosure';
import DeleteEnclosure from './components/DeleteEnclosure/DeleteEnclosure';
import SearchEnclosure from './components/SearchEnclosure/SearchEnclosure';
import AddSecurityForm from './components/AddSecurityForm/AddSecurityForm';
import ModifyAnimal from './components/ModifyAnimal/ModifyAnimal';
import DeleteAnimal from './components/DeleteAnimal/DeleteAnimal';
import SearchAnimal from './components/SearchAnimal/SearchAnimal';
import SecurityReport from './components/SecurityReport/SecurityReport';
import EnclosureReport from './components/EnclosureReport/EnclosureReport';
import AnimalReport from './components/AnimalReport/AnimalReport';
import BusinessReport from './components/BusinessReport/BusinessReport';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavbarTemp from './components/Navbar/NavbarTemp';
import axios from 'axios';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [customerId, setCustomerId] = useState('');

    // Load user data from local storage on initial app load
    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserEmail = localStorage.getItem('userEmail');
        const storedEmployeeId = localStorage.getItem('employeeId');
        const storedCustomerId = localStorage.getItem('customerId');

        if (storedUserRole) {
            setUserRole(storedUserRole);
            setUserEmail(storedUserEmail || '');
            setEmployeeId(storedEmployeeId || '');
            setCustomerId(storedCustomerId || '');
            setLoggedIn(true);
        }
    }, []);

    // Function to handle sign-in
    async function handleSignIn(email, password) {
        console.log('Email:', email);
        console.log('Password:', password);

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:5095/api/ZooDb/ValidateUser', userData);
            
            // Handle response data and set state accordingly
            if (response.data.userType === 'employee' || response.data.userType === 'manager') {
                setEmployeeId(response.data.employeeId);
                localStorage.setItem('employeeId', response.data.employeeId);
            } else if (response.data.userType === 'customer') {
                setCustomerId(response.data.customerId);
                localStorage.setItem('customerId', response.data.customerId);
            }

            setUserRole(response.data.userType);
            setLoggedIn(true);
            setUserEmail(email);

            // Store user data in local storage
            localStorage.setItem('userRole', response.data.userType);
            localStorage.setItem('userEmail', email);

            // Navigate to home page
            navigate('/');
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }

    // Function to handle sign-out
    const handleSignOut = () => {
        // Reset authentication status
        setLoggedIn(false);
        setUserRole('');
        setUserEmail('');
        setEmployeeId('');
        setCustomerId('');

        // Remove user data from local storage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('employeeId');
        localStorage.removeItem('customerId');

        // Navigate to sign-in page
        navigate('/sign-in');
    };

    return (
        <>
            <div className="container">
                {loggedIn ? (
                    userRole === 'customer' ? (
                        <CustomerNavbar handleSignOut={handleSignOut} />
                    ) : userRole === 'employee' ? (
                        <EmployeeNavbar handleSignOut={handleSignOut} />
                    ) : userRole === 'manager' ? (
                        <ManagerNavbar handleSignOut={handleSignOut} />
                    ) : (
                        <NavbarTemp />
                    )
                ) : (
                    <NavbarTemp />
                )}
                <Routes>
                    <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/customer-profile" element={<CustomerProfile />} />
                    <Route path="/employee-profile" element={<EmployeeProfile />} />
                    <Route path="/ticket-buy" element={<TicketBuy customerId={customerId} />} />
                    <Route path="/ticket-view" element={<TicketView customerId={customerId} />} />
                    <Route path="/donation" element={<Donation customerId={customerId} />} />
                    <Route path="/veterinarian-record" element={<VeterinarianRecord />} />
                    <Route path="/diet-entry" element={<DietForm />} />
                    <Route path="/add-enclosure" element={<AddEnclosureForm />} />
                    <Route path="/modify-enclosure" element={<ModifyEnclosure />} />
                    <Route path="/delete-enclosure" element={<DeleteEnclosure />} />
                    <Route path="/search-enclosure" element={<SearchEnclosure />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/add-animal" element={<AddAnimal />} />
                    <Route path="/search-animal" element={<SearchAnimal />} />
                    <Route path="/modify-animal" element={<ModifyAnimal />} />
                    <Route path="/delete-animal" element={<DeleteAnimal />} />
                    <Route path="/add-security-form" element={<AddSecurityForm employeeId={employeeId} />} />
                    <Route path="/security-report" element={<SecurityReport />} />
                    <Route path="/enclosure-report" element={<EnclosureReport />} />
                    <Route path="/animal-report" element={<AnimalReport />} />
                    <Route path="/business-report" element={<BusinessReport />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
