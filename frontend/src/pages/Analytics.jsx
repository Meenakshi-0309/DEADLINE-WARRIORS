import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import AnalyticsCards from "../components/AnalyticCards";
import AnalyticsDonutChart from "../components/AnalyticsDonutChart";
import QuickInsights from "../components/QuickInsights";
import TaskSummaryTable from "../components/TaskSummaryTable";

import "../styles/Analytics.css";
import "../styles/MainHome.css";

function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAnalyticsData = async () => {
      try {
        const [tasksRes, historyRes] = await Promise.all([
          fetch("https://deadline-warriors-1.onrender.com/api/tasks", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),

          fetch("https://deadline-warriors-1.onrender.com/api/history", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        const tasksData = await tasksRes.json();
        const historyData = await historyRes.json();

        if (!tasksRes.ok) {
          throw new Error(
            tasksData.message || "Failed to fetch tasks"
          );
        }

        if (!historyRes.ok) {
          throw new Error(
            historyData.message || "Failed to fetch task history"
          );
        }

        // Combine active tasks and completed task history
        const allTasks = [...tasksData, ...historyData];

        setTasks(allTasks);

        console.log("Tasks:", tasksData);
        console.log("History:", historyData);
        console.log("Combined:", allTasks);
      } catch (err) {
        console.error("Analytics Error:", err);
      }
    };

    fetchAnalyticsData();
  }, []);

  const totalTasks = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const overdue = tasks.filter(
  (task) =>
    task.status === "Expired" ||
    task.status === "Overdue" ||
    task.status === "Verified Not Completed"
).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completed / totalTasks) * 100);

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

        <div className="analytics-page">

          <h1 className="analytics-title">
            📊 Analytics Dashboard
          </h1>

          <AnalyticsCards
            totalTasks={totalTasks}
            completed={completed}
            pending={pending}
            overdue={overdue}
          />

          <div className="middle-section">

            <AnalyticsDonutChart
              completed={completed}
              pending={pending}
              overdue={overdue}
            />

            <QuickInsights
              completionRate={completionRate}
              pending={pending}
              overdue={overdue}
              highPriority={highPriority}
            />

          </div>

          <TaskSummaryTable tasks={tasks} />

        </div>

      </main>

    </div>
  );
}

export default Analytics;