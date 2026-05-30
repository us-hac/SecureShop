import { useState } from "react";
import api from "../axiosConfig";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register",{ name, email, password });
      setMessage(response.data);
    } catch (error) {
      setMessage("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Account</h2>

      <input
        className="form-input"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {message && (
        <p className={`form-message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Register;