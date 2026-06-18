import React from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function AnalyticsCards({
  totalTasks,
  completed,
  pending,
  overdue,
}) {
  return (
    <div className="analytics-cards">

      <div className="card">
        <FaTasks className="icon blue" />
        <h3>Total Tasks</h3>
        <h2>{totalTasks}</h2>
      </div>

      <div className="card">
        <FaCheckCircle className="icon green" />
        <h3>Completed</h3>
        <h2>{completed}</h2>
      </div>

      <div className="card">
        <FaClock className="icon yellow" />
        <h3>Pending</h3>
        <h2>{pending}</h2>
      </div>

      <div className="card">
        <FaExclamationTriangle className="icon red" />
        <h3>Overdue</h3>
        <h2>{overdue}</h2>
      </div>

    </div>
  );
}

export default AnalyticsCards;