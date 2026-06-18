import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";

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
    lineHeight: "1.2",
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
    marginTop: "2px",
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
    marginTop: "15px",
    color: "#64748b",
  },

  link: {
    color: "#273075",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

const userSchema = z
  .string()
  .min(6, "Username must have at least 6 characters.")
  .max(25, "Username should not exceed 25 characters.");

const passwordSchema = z
  .string()
  .min(8, "Password must have at least 8 characters.")
  .max(25, "Password should not exceed 25 characters.");

function validate(schema, value) {
  if (!value) return "";
  const result = schema.safeParse(value);
  if (result.success) return "";
  return result.error.issues[0].message;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);

  const SendDetails = async (event) => {
    event.preventDefault();

    try {
      const jwtoken = localStorage.getItem("token");

      const response = await fetch(
        "https://deadline-warriors-1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwtoken}`,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert(data.message);

      localStorage.setItem("token", data.token);

      window.location.href = "/mainhome";

    } catch (error) {
      console.log("Login error:", error);
      alert("Server not responding");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login to your account</h1>

        <form onSubmit={SendDetails} style={styles.form}>
          <div style={styles.row}>
            <label style={styles.label}>Email:</label>

            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <p style={styles.error}>
            {validate(userSchema, username)}
          </p>

          <div style={styles.row}>
            <label style={styles.label}>Password:</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <p style={styles.error}>
            {validate(passwordSchema, password)}
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={hover ? styles.buttonHover : styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Login
            </button>
          </div>

          <p style={styles.text}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;