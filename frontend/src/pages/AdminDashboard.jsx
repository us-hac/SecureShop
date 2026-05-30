import { useState, useEffect } from "react";
import api from "../axiosConfig";

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/feedback/all");
      setFeedbackList(response.data);
    } catch (error) {
      setMessage("Could not load feedback!");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/feedback/delete/${id}`);
      setMessage("Feedback deleted!");
      setTimeout(() => setMessage(""), 2000);
      fetchAllFeedback();
    } catch (error) {
      setMessage("Could not delete feedback!");
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <h2 className="page-title" style={{ margin: "0" }}>Admin Dashboard</h2>
        <span className="badge badge-admin">ADMIN</span>
      </div>

      {message && (
        <p style={{ color: "#34c759", fontWeight: "500", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : feedbackList.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ fontSize: "48px" }}>📭</p>
          <p style={{ color: "#6e6e73", marginTop: "10px" }}>
            No feedback submitted yet!
          </p>
        </div>
      ) : (
        <div>
          <p style={{ color: "#6e6e73", marginBottom: "16px" }}>
            {feedbackList.length} feedback entries found
          </p>
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                    ✉️ {feedback.email}
                  </p>
                  <p style={{ color: "#6e6e73", fontSize: "13px", marginBottom: "10px" }}>
                    User ID: {feedback.userId}
                  </p>
                  <p style={{ fontSize: "15px", lineHeight: "1.5" }}>
                    {feedback.message}
                  </p>
                </div>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "16px", flexShrink: "0" }}
                  onClick={() => handleDelete(feedback.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;