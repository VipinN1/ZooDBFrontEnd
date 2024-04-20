import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomerNavbar.css";

export default function ManagerNavbar({handleSignOut}) {
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
          Zoo Reports
          {isHovered && (
            <div className="sub-menu-customer">
              <CustomLink to="/enclosure-report">Enclosure Report</CustomLink>
              <CustomLink to="/animal-report">Animal Report</CustomLink>
              <CustomLink to="/revenue-report">Revenue Report</CustomLink>
              <CustomLink to="/security-report">Security Report</CustomLink>
            </div>
          )}
        </CustomLink>
        <CustomLink to="/about-us">About us</CustomLink>
        <li className="nav-item">
        <button onClick={handleSignOut}>Sign out</button>
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