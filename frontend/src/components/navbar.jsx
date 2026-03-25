import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  return (
    <div className="navbar">
      <Link className="links" to="/dashboard">Dashboard</Link> 
      <Link className="links" to="/tasks">Tasks</Link>
      <h1 className="logo">Task Manager</h1>
      <button className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
