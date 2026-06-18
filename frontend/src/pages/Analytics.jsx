import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { getTasks } from "../services/taskService";
import "../styles/MainHome.css";

function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>

        <nav className="mainnav">
          <Link to="/mainhome">🏠 Home</Link>
          <Link to="/history">📜 Task History</Link>
          <Link to="/analytics">📊 Analytics</Link>
          <Link to="/about">ℹ️ About</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <div className="dashboard-cards">

          <div className="card">
            <h3>Total Tasks</h3>
            <h2>{tasks.length}</h2>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <h2>
              {tasks.filter(task => task.status === "Completed").length}
            </h2>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <h2>
              {tasks.filter(task => task.status !== "Completed").length}
            </h2>
          </div>

        </div>
      </main>

    </div>
  );
}

export default Analytics;