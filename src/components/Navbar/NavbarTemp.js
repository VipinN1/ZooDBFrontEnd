// NavbarTemp.js
import React from "react";
import CustomerNavbar from "../Views/CustomerNavbar";
import EmployeeNavbar from "../Views/EmployeeNavbar";
import ManagerNavbar from "../Views/ManagerNavbar";
import Navbar from "./Navbar";

function NavbarTemp({ loggedIn, userRole }) {
    let navbarComponent;

    if (loggedIn) {
        switch (userRole) {
            case 'customer':
                navbarComponent = <CustomerNavbar />;
                break;
            case 'employee':
                navbarComponent = <EmployeeNavbar />;
                break;
            case 'manager':
                navbarComponent = <ManagerNavbar />;
                break;
            default:
                navbarComponent = <Navbar />;
        }
    } else {
        navbarComponent = <Navbar />;
    }

    return navbarComponent;
}

export default NavbarTemp;
