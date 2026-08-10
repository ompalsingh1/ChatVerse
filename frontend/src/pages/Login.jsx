import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api.js";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your username");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/users/login", {
        username: trimmedUsername,
      });

      const user = response.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/chat");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <h1>ChatVerse</h1>
          <p>Connect. Chat. Share.</p>
        </div>

        <div className="login-content">
          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Login to continue chatting
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                autoComplete="username"
              />
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default Login;