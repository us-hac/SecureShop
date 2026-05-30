import { useState } from "react";
import api from "../axiosConfig";

function Feedback({ userId, userEmail }) {
  const [message, setMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message) {
      setResponseMsg("Please write a message!");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(
        "/api/feedback/submit",
        {
          userId: userId,
          email: userEmail,
          message: message,
        }
      );
      setResponseMsg(response.data);
      setMessage("");
    } catch (error) {
      setResponseMsg("Could not submit feedback!");
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="form-container" style={{ margin: "0 auto" }}>
        <h2 className="form-title">Send Feedback</h2>

        <p style={{ color: "#6e6e73", fontSize: "14px", marginBottom: "20px", textAlign: "center" }}>
          We'd love to hear what you think about SecureShop!
        </p>

        <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "6px" }}>
          Sending as: <span style={{ color: "#0071e3" }}>{userEmail}</span>
        </p>

        <textarea
          className="form-textarea"
          rows="6"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="btn btn-primary"
          style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "16px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Feedback"}
        </button>

        {responseMsg && (
          <p className={`form-message ${responseMsg.includes("success") ? "success" : "error"}`}>
            {responseMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Feedback;