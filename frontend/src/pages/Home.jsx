import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";
import Header from '../components/Header';


function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
        <Header/>
        
      <div className="glass-card">
        <section className="hero">
          <h1>
            Beat Every Deadline
            <br />
            Like A Warrior
          </h1>

          <p>
            Organize tasks, track deadlines, receive reminders and
            stay productive with AI-powered assistance.
          </p>

          <Link to="/register" className="cta-btn">
  Get Started →
</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;