import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data || []); // ✅ safety
      } catch (err) {
        console.log("Error:", err);
        setTasks([]); // ✅ fallback
      }
    };

    fetchData();
  }, []);

  // ✅ SAFE CALCULATIONS
  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.status === "completed").length || 0;
  const pending = total - completed;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="task-card">
        <p>Total: {total}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
      </div>
      {tasks.length > 0 && (
        <div className="task-card" style={{ textAlign: "center" }}>
          <h3>Task Distribution</h3>

          <PieChart width={300} height={300}>
            <Pie
              data={[
                { name: "Completed", value: completed },
                { name: "Pending", value: pending },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              <Cell fill="#27ae60" />
              <Cell fill="#e74c3c" />
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      <button onClick={() => navigate("/tasks")}>Go to Tasks</button>
    </div>
  );
}

export default Dashboard;
