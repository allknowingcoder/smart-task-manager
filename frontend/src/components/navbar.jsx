import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> |<Link to="/tasks">Tasks</Link>
      <button
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
