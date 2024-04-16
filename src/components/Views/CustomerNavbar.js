import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomerNavbar.css";

export default function CustomerNavbar({ handleSignOut }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="nav-customer">
      <Link to="/" className="site-title-customer">
        Zoo
      </Link>
      <ul>
        <CustomLink
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Tickets
          {isHovered && (
            <div className="sub-menu-customer">
              <CustomLink to="/ticket-view">View Tickets</CustomLink>
              <CustomLink to="/ticket-buy">Buy Tickets</CustomLink>
            </div>
          )}
        </CustomLink>
        <CustomLink to="/donation">Donate</CustomLink>
        <CustomLink to="/about-us">About Us</CustomLink>
        <li className="nav-item">
        <button onClick={handleSignOut}>Sign Out</button>
        </li>

      </ul>
    </nav>
  );
}

function CustomLink({ to, children, onMouseEnter, onMouseLeave, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
