import { useEffect, useState } from "react";
import API from "../services/api";
import NAVBAR from "../components/navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });

  
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "", priority: "", deadline: "" });
    fetchTasks();
  };

  
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  
  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, { status: "completed" });
    fetchTasks();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/tasks");
      setTasks(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <NAVBAR />
    <div className="container">
      <h2>Tasks</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        />
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      {tasks
        .filter((task) => {
          if (filter === "all") return true;
          return task.status === filter;
        })
        .filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase()),
        )
        .map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline?.slice(0, 10)}</p>

            {new Date(task.deadline) < new Date() &&
              task.status !== "completed" && (
                <p style={{ color: "red" }}>Overdue</p>
              )}

            <div className="task-actions">
              <button
                className="complete-btn"
                onClick={() => completeTask(task._id)}
              >
                Complete
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
    </>
  );
}

export default Tasks;
