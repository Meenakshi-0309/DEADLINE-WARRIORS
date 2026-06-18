import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "../styles/About.css";
import "../styles/MainHome.css";

function About() {
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
        <div className="about-container">
          <div className="about-card">
            <h1>About Deadline Warrior</h1>

            <p className="intro">
              Deadline Warrior is a smart productivity and task management
              platform designed to help users stay organized, meet deadlines,
              and accomplish their goals without stress.
            </p>

            <div className="about-section">
              <h2>🎯 Our Mission</h2>
              <p>
                Many students and professionals often struggle with missed
                deadlines and forgotten assignments. This usually happens due
                to poor task organization and lack of proper planning. As a
                result, they experience stress, confusion, and reduced
                productivity. Deadline Warrior is designed to solve these
                problems with an intelligent task management system. It helps
                users track all their tasks in one place in an organized
                manner. The system allows users to prioritize work based on
                urgency and importance. It also provides reminders to ensure no
                deadline is missed. By improving planning and structure, it
                helps users complete tasks on time efficiently.
              </p>
            </div>

            <div className="about-section">
              <h2>⚡ Key Features</h2>

              <ul>
                <li>
                  Task Creation, Updation and Deletion with Deadline Calendar
                </li>
                <li>Smart Task Tracking and Reminders</li>
                <li>AI Chatbot Assistant for Productivity Support</li>
                <li>Task History Management</li>
                <li>Analytics Dashboard with Visual Reports</li>
                <li>Deadline Completion Monitoring</li>
                <li>Tracking the Overdue and Active Tasks</li>
              </ul>
            </div>

            <div className="about-section">
              <h2>📊 Analytics Dashboard</h2>
              <p>
                The Analytics Dashboard in Deadline Warrior helps users clearly
                understand their productivity levels through visual insights.
                It presents data in the form of interactive charts and
                easy-to-read statistics. Users can track the number of
                completed tasks, pending tasks, and overdue tasks in real time.
                It also highlights active tasks that are currently in progress
                for better focus. Additionally, the dashboard shows on-time
                completion rates to measure efficiency and consistency. These
                insights help users identify their strengths and improve weak
                areas in task management. Overall, it supports smarter
                decision-making and better time utilization.
              </p>
            </div>

            <div className="about-section">
              <h2>🤖 AI Assistant</h2>
              <p>
                The integrated AI Assistant in Deadline Warrior acts as a smart
                productivity companion for users. It can instantly answer
                questions related to tasks, deadlines, and workflow management.
                The chatbot also provides personalized productivity tips to
                help users work more efficiently. It assists in prioritizing
                tasks based on urgency and importance, making planning easier.
                By sending timely reminders and suggestions, it ensures that
                important deadlines are never missed. The AI continuously
                supports users in staying organized and focused throughout
                their work. Overall, it enhances decision-making and makes task
                management more intelligent and effortless.
              </p>
            </div>

            <div className="about-section">
              <h2>🚀 Why Deadline Warrior?</h2>
              <p>
                Deadline Warrior is designed to revolutionize the way students
                and professionals manage their daily tasks and responsibilities.
                It brings everything together in one place, eliminating the
                need for multiple tools. Users can easily create, organize, and
                track their tasks with clear deadline monitoring. The platform
                also provides smart analytics to help users understand their
                productivity patterns. With built-in AI assistance, it offers
                intelligent suggestions and reminders to stay on track. This
                combination of features ensures better planning, reduced
                stress, and improved efficiency. Ultimately, Deadline Warrior
                helps users stay consistent, focused, and ahead of their
                deadlines.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;