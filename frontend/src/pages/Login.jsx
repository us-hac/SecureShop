import { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (response.data.userId !== null) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        onLoginSuccess(
          response.data.userId,
          response.data.email,
          response.data.role
        );
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Welcome Back</h2>

      <input
        className="form-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "16px" }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default Login;