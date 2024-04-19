import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomerNavbar.css"; // Reuse the existing CSS

export default function EmployeeNavbar({ handleSignOut }) {
  const [isHoveredAnimals, setIsHoveredAnimals] = useState(false);
  const [isHoveredSecurity, setIsHoveredSecurity] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false); // State for employee profile dropdown

  return (
    <nav className="nav-customer">
      <ul>
        <li className="nav-item-title">
          <Link to="/" className="site-title-customer">Cougar Zoo</Link>
        </li>
        <li className="nav-item-dropdown"
            onMouseEnter={() => setIsHoveredAnimals(true)}
            onMouseLeave={() => setIsHoveredAnimals(false)}>
          <Link to="#" className="nav-link">Animals</Link>
          {isHoveredAnimals && (
            <div className="sub-menu-customer">
              <CustomLink to="/veterinarian-record">Vet Records</CustomLink>
              <CustomLink to="/diet-entry">Diets</CustomLink>
            </div>
          )}
        </li>
        <CustomLink to="/clock-in">Clock In</CustomLink>
        <CustomLink to="/add-enclosure-form">Enclosure Entry</CustomLink>
        <CustomLink to="/orders">Orders</CustomLink>
        <li className="nav-item-dropdown"
            onMouseEnter={() => setIsHoveredSecurity(true)}
            onMouseLeave={() => setIsHoveredSecurity(false)}>
          <Link to="#" className="nav-link">Security</Link>
          {isHoveredSecurity && (
            <div className="sub-menu-customer">
              <CustomLink to="/add-security-form">Security Entry</CustomLink>
            </div>
          )}
        </li>
        <li className="nav-item-dropdown"
            onMouseEnter={() => setIsHoveredProfile(true)}
            onMouseLeave={() => setIsHoveredProfile(false)}>
          <Link to="#" className="nav-link">Employee Profile</Link>
          {isHoveredProfile && (
            <div className="sub-menu-customer">
              <CustomLink to="/employee-profile-view">View Profile</CustomLink>
              <CustomLink to="/employee-profile-update">Update Profile</CustomLink>
            </div>
          )}
        </li>
        <li className="nav-item-button">
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
