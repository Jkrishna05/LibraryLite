import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">📚 Library App</h2>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Book List</Link>
        <Link to="/add" className="nav-link">Add Book</Link>
      </div>
    </nav>
  );
}