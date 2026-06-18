import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainHome from "./pages/MainHome";
import Analytics from "./pages/Analytics";
import Chatbot from "./pages/Chatbot";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import TaskHistory from "./pages/TaskHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* App Pages */}
        <Route path="/mainhome" element={<MainHome />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<TaskHistory />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;