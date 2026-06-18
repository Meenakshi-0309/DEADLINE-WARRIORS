import React, { useState, useEffect } from "react";
import "../styles/MainHome.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Chatbot from "../pages/Chatbot";
import TaskCard from "../components/TaskCard";

import {
  getTasks,
  createTask
} from "../services/taskService";

function MainHome({ setSearch }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bot, setBot] = useState(false);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: ""
  });

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline
      });

      await loadTasks();

      setTaskData({
        title: "",
        description: "",
        deadline: ""
      });

      setShowForm(false);
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

        <div className="topbar">
          <input
            className="search-bar"
            placeholder="🔍 Search tasks..."
            onChange={(e) =>
              setSearch && setSearch(e.target.value)
            }
          />
        </div>

        {/* Task List */}
        <div className="task-grid">

          {tasks.length === 0 ? (
            <div className="empty-state">
              <h2>No Tasks Found</h2>
              <p>Create your first task using +</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                refresh={loadTasks}
              />
            ))
          )}

        </div>
      </main>

      {/* Chat Button */}
      <button
        className="chat-btn"
        onClick={() => setBot(true)}
      >
        💬
      </button>

      {/* Add Task Button */}
      <button
        className="add-btn"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <form className="task-form" onSubmit={handleSubmit}>
            <h2>Create Task</h2>

            <input
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="deadline"
              value={taskData.deadline}
              onChange={handleChange}
              required
            />

            <button className="save-btn" type="submit">
              Save Task
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Chatbot */}
      {bot && <Chatbot setBot={setBot} />}

    </div>
  );
}

export default MainHome;