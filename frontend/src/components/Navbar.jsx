import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Smart Task Manager
      </h1>

      <div className="space-x-4">

        <Link to="/tasks">
          Tasks
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        <Link to="/chatbot">
          AI Chat
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;