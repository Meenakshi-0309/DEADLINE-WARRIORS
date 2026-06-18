import { useEffect, useState } from "react";

import {
  getTasks,
  createTask
} from "../services/taskService";

import TaskCard from "../components/TaskCard";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");

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

  const addTask = async () => {

    if (!title || !deadline) {

      alert("Title and Deadline are required");

      return;
    }

    try {

      await createTask({
        title,
        description,
        deadline
      });

      setTitle("");
      setDescription("");
      setDeadline("");

      loadTasks();

    } catch (error) {

      console.log(error);

      alert("Failed to create task");
    }
  };

  return (

    <div>

      <h2>Task Manager</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <input
        type="date"
        value={deadline}
        onChange={(e) =>
          setDeadline(e.target.value)
        }
      />

      <br /><br />

      <button onClick={addTask}>
        Add Task
      </button>

      <hr />

      <h3>Your Tasks</h3>

      {
        tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (

            <TaskCard
              key={task._id}
              task={task}
              refresh={loadTasks}
            />

          ))
        )
      }

    </div>

  );
}

export default Tasks;