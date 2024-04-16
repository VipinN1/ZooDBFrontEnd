import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./Navbar.css"
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Zoo
      </Link>
      <ul>
        <CustomLink to="/about-us">About Us</CustomLink>
        <CustomLink to="/sign-in">Sign In</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}