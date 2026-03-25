import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data || []);
      } catch (err) {
        console.log("Error:", err);
        setTasks([]); 
      }
    };

    fetchData();
  }, []);

  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.status === "completed").length || 0;
  const pending = total - completed;

  return (
    <>
    <Navbar />
    <div className="dashboard-container">
     <div className="dashboard-content">

      <h2>Dashboard</h2>

      <div className="stats-card">
        <p>Total: {total}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
      </div>
      {tasks.length > 0 && (
        <div className="task-card" style={{ textAlign: "center" }}>
         
        </div>
      )}

      <button className="task-btn" onClick={() => navigate("/tasks")}>Go to Tasks</button>
    </div>
  </div>
    </>
  );
}

export default Dashboard;
