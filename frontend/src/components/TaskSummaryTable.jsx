import React from "react";

function TaskSummaryTable({ tasks }) {
  return (
    <div className="table-card">

      <h2>Recent Tasks</h2>

      <table>

        <thead>

          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
          </tr>

        </thead>

        <tbody>

          {tasks.length > 0 ? (
            tasks.slice(0, 5).map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Tasks Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TaskSummaryTable;