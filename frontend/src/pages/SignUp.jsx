import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import API from "../services/api"; // 👈 IMPORTANT (your axios instance)

const API_BASE = "http://localhost:5000";

/* VALIDATION */
let userSchema = z
  .string()
  .min(6, "Username must have 6 characters")
  .max(25);

let passwordSchema = z
  .string()
  .min(8, "Password must have 8 characters")
  .max(25);

let emailSchema = z.string().email("Invalid email format");

function validate(schema, value) {
  if (!value) return "";
  let result = schema.safeParse(value);
  if (result.success) return "";
  return result.error.issues[0].message;
}

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hover, setHover] = useState(false);

  const senddetails = async (event) => {
    event.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Signup successful");

      window.location.href = "/login";
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <form onSubmit={senddetails} style={styles.form}>
          {/* Username */}
          <div style={styles.row}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <p style={styles.error}>{validate(userSchema, name)}</p>

          {/* Password */}
          <div style={styles.row}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <p style={styles.error}>{validate(passwordSchema, password)}</p>

          {/* Email */}
          <div style={styles.row}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <p style={styles.error}>{validate(emailSchema, email)}</p>

          {/* Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={hover ? styles.buttonHover : styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Login link */}
          <p style={styles.text}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

/* STYLES */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    fontFamily: "Arial",
  },
  card: {
    width: "450px",
    padding: "35px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#0f172a",
    fontSize: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "12px",
  },
  label: {
    fontSize: "16px",
    color: "#131416",
    width: "90px",
    flexShrink: 0,
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  error: {
    fontSize: "12px",
    color: "red",
    minHeight: "8px",
  },
  button: {
    height: "45px",
    width: "100%",
    fontSize: "17px",
    marginTop: "20px",
    borderRadius: "8px",
    backgroundColor: "#273075",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  buttonHover: {
    height: "45px",
    width: "100%",
    fontSize: "17px",
    marginTop: "20px",
    borderRadius: "8px",
    backgroundColor: "#5a6a84",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
    marginTop: "25px",
    color: "#64748b",
  },
  link: {
    color: "#273075",
    textDecoration: "none",
    fontWeight: "bold",
  },
};