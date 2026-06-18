import React, { useState, useEffect } from "react";
import "../styles/MainHome.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Chatbot from "../pages/Chatbot";
import TaskCard from "../components/TaskCard";

import {getTasks, createTask, updateTask} from "../services/taskService";

function MainHome() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bot, setBot] = useState(false);
  const [editTask, setEditTask] = useState(null);

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

  const handleEdit = (task) => {
    setEditTask(task._id);

  setTaskData({
    title: task.title,
    description: task.description,
    deadline: task.deadline
      ? new Date(task.deadline).toISOString().split('T')[0]
      : ""
  });

  setShowForm(true);
};

  const closeForm = () => {
    setShowForm(false);
    setEditTask(null);
    setTaskData({ title: "", description: "", deadline: "" });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editTask) {
      await updateTask(editTask, {
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline
      });
    } else {
      await createTask({
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline
      });
    }
    await loadTasks();
    closeForm();
  } catch (error) {
    console.log(error);
  }
};

const filteredTasks = tasks.filter((task) => {
  const searchText = search.toLowerCase();

  return (
    task.title?.toLowerCase().includes(searchText) ||
    task.description?.toLowerCase().includes(searchText)
  );
});

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Task List */}
        <div className="task-grid">

          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h2>No Tasks Found</h2>
              <p>Create your first task using +</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                refresh={loadTasks}
                onEdit={handleEdit}
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
            <h2>
              {editTask ? "Edit Task" : "Create Task"}
            </h2>

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

            <button
  className="save-btn"
  type="submit"
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 5px 15px rgba(37,99,235,0.3)"
  }}
>
  {editTask ? "Update Task" : "Save Task"}
</button>


<button
  type="button"
  className="cancel-btn"
  onClick={() => setShowForm(false)}
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 5px 15px rgba(37,99,235,0.3)"
  }}
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