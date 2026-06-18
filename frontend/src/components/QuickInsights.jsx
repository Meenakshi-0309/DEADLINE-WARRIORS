import React from "react";

function QuickInsights({
  completionRate,
  pending,
  overdue,
  highPriority,
}) {
  return (
    <div className="insights">

      <h2>Quick Insights</h2>

      <div className="insight-box">
        <span>Completion Rate</span>
        <strong>{completionRate}%</strong>
      </div>

      <div className="insight-box">
        <span>Pending Tasks</span>
        <strong>{pending}</strong>
      </div>

      <div className="insight-box">
        <span>Overdue Tasks</span>
        <strong>{overdue}</strong>
      </div>

      <div className="insight-box">
        <span>High Priority Tasks</span>
        <strong>{highPriority}</strong>
      </div>

    </div>
  );
}

export default QuickInsights;