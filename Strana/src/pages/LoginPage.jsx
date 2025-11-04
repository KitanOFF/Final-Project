import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:1000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      // ✅ SUCCESSFUL LOGIN LOGIC
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        // Decode the token to find the user's role
        try {
          const decoded = jwtDecode(data.token);
          const userRole = decoded.role; // ⬅️ ASSUMING your JWT payload includes the 'role' field

          // Route the user based on their role
          if (userRole === "mentor") {
            navigate("/DashBoardMentor"); // Mentor dashboard route
          } else if (userRole === "startup") {
            navigate("/DashBoard"); // Startup dashboard route
          } else {
            // Fallback for an unknown role
            setError("Login successful, but user role is unknown.");
            navigate("/"); 
          }
        } catch (decodeError) {
          console.error("Failed to decode token:", decodeError);
          setError("Login successful, but failed to process user data.");
          navigate("/"); 
        }

      } else {
        // ❌ LOGIN FAILED
        setError(data.message || "Login error");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="login-root">
      <div className="left-panel">
        <img src="logo-3.1.png" className="full-bg" alt="Background" />
      </div>
      <div className="right-panel">
        <div className="login-box">
          <div className="logo-top">
            <img src="./small-logo.png" alt="Mentor Token" />
          </div>
          <h3>LOG IN TO MENTOR TOKEN</h3>
          <p className="form-desc">Enter your email and pass to login.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="flex-links">
              <Link className="forgot-link" to="/forgot-password">Forgot password?</Link>
            </div>
            <button type="submit" className="login-Btn">
              Log in
            </button>
            {error && <div className="error">{error}</div>}
          </form>
          <div className="register-link">
            Don't have account? <Link to="/Signup">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;