import {
  deleteTask,
  completeTask
} from "../services/taskService";

function TaskCard({ task, refresh, onEdit }) {

  const removeTask = async () => {
    try {
      await deleteTask(task._id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const finishTask = async () => {
    try {
      await completeTask(task._id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="date">
        📅 {new Date(task.deadline).toLocaleDateString()}
      </div>

      <div className="priority">
        Priority: {task.priority || "Normal"}
      </div>

      <div className="status">
        Status: {task.status || "Pending"}
      </div>

      <div className="task-actions">

        <button
          className="edit-btn"
          onClick = {() => {
            if(typeof onEdit === "function") {
              onEdit(task);
            } else {
              console.error("onEdit prop is missing on TaskCard!");
            }
        }}
        >
          Edit
        </button>

        <button
          className="complete-btn"
          onClick={finishTask}
        >
          Completed
        </button>

        <button
          className="delete-btn"
          onClick={removeTask}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;