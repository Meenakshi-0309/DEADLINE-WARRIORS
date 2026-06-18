import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import API from "../services/api";
import "../styles/MainHome.css";

function TaskHistory() {

  const [history, setHistory] = useState([]);


  const loadHistory = async () => {
    try {
      const res = await API.get("/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const verifyTask = async (id, status) => {
    try {

      await API.put(
        `/history/verify/${id}`,
        {
          status
        }
      );

      loadHistory();

    } catch (error) {
      console.log(error);
    }
  };


  const deleteHistoryTask = async (id) => {
  try {

    const res = await API.delete(
      `/history/delete/${id}`
    );

    console.log(res.data);

    setHistory((prev) =>
      prev.filter(
        (task) => task._id !== id
      )
    );

  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    loadHistory();
  }, []);



  return (
    <div className="dashboard">


      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>


        <nav className="mainnav">

          <Link to="/mainhome">
            🏠 Home
          </Link>

          <Link to="/history">
            📜 Task History
          </Link>

          <Link to="/analytics">
            📊 Analytics
          </Link>

          <Link to="/about">
            ℹ️ About
          </Link>

        </nav>

      </aside>



      {/* Main Content */}
      <main className="content">


        <div className="topbar">

          <h1>
            Completed Tasks History
          </h1>

        </div>



        <div className="task-grid">


          {history.length === 0 ? (

            <div className="empty-state">

              <h2>
                No Completed Tasks
              </h2>

            </div>

          ) : (


            history.map((task) => (

              <div
                className="task-card"
                key={task._id}
              >


                <h3>
                  {task.title}
                </h3>


                <p>
                  {task.description}
                </p>



                <div className="date">

                  📅 Deadline:{" "}

                  {new Date(
                    task.deadline
                  ).toLocaleDateString()}

                </div>



                <div className="priority">

                  Priority: {task.priority}

                </div>



                <div className="status">

                  Status: {task.status}

                </div>



                <div className="date">

                  Completed:{" "}

                  {new Date(
                    task.completedAt
                  ).toLocaleDateString()}

                </div>




                {/* Verify buttons only for expired tasks */}

                {task.status === "Expired" && (

                  <div className="task-actions">


                    <button
                      className="complete-btn"
                      onClick={() =>
                        verifyTask(
                          task._id,
                          "Verified Completed"
                        )
                      }
                    >
                      Completed
                    </button>



                    <button
                      className="delete-btn"
                      onClick={() =>
                        verifyTask(
                          task._id,
                          "Overdue"
                        )
                      }
                    >
                      Not Completed
                    </button>


                  </div>

                )}




                {/* Permanent delete button always visible */}

                <div className="task-actions">

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteHistoryTask(task._id)
                    }
                  >
                    Delete Permanently
                  </button>

                </div>



              </div>

            ))

          )}


        </div>


      </main>


    </div>
  );
}


export default TaskHistory;
