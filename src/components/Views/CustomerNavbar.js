import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomerNavbar.css";

export default function CustomerNavbar({ handleSignOut }) {
  const [isHoveredTickets, setIsHoveredTickets] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);

  return (
    <nav className="nav-customer">
      <ul>
        <li className="nav-item-title">
          <Link to="/" className="site-title-customer">Cougar Zoo</Link>
        </li>
        <li className="nav-item-dropdown"
            onMouseEnter={() => setIsHoveredTickets(true)}
            onMouseLeave={() => setIsHoveredTickets(false)}>
          <Link to="#" className="nav-link">Tickets</Link>
          {isHoveredTickets && (
            <div className="sub-menu-customer">
              <CustomLink to="/ticket-view">View Tickets</CustomLink>
              <CustomLink to="/ticket-buy">Buy Tickets</CustomLink>
            </div>
          )}
        </li>
        <li className="nav-item-dropdown"
            onMouseEnter={() => setIsHoveredProfile(true)}
            onMouseLeave={() => setIsHoveredProfile(false)}>
          <Link to="#" className="nav-link">Customer Profile</Link>
          {isHoveredProfile && (
            <div className="sub-menu-customer">
              <CustomLink to="/customer-profile-view">View Profile</CustomLink>
              <CustomLink to="/customer-profile-update">Update Profile</CustomLink>
            </div>
          )}
        </li>
        <CustomLink to="/donation">Donate</CustomLink>
        <CustomLink to="/about-us">About Us</CustomLink>
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
