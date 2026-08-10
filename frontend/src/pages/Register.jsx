import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api.js";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/users/register", {
        username: trimmedUsername,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">

        {/* Brand */}
        <div className="register-brand">
          <h1>ChatVerse</h1>
          <p>Connect. Chat. Share.</p>
        </div>

        {/* Content */}
        <div className="register-content">
          <h2>Create Account</h2>

          <p className="register-subtitle">
            Create your account to start chatting
          </p>

          <form onSubmit={handleRegister}>

            <div className="input-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                autoComplete="username"
              />
            </div>

            {error && (
              <p className="register-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>

          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default Register;