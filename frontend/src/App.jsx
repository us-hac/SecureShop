import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Basket from "./pages/Basket";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [page, setPage] = useState("login");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleLoginSuccess = (id, email, role) => {
    setUserId(id);
    setUserEmail(email);
    setUserRole(role);
    setPage("products");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">🛒 SecureShop</span>
        <div className="navbar-links">
          {!userId ? (
            <>
              <button className="btn btn-ghost" onClick={() => setPage("login")}>Login</button>
              <button className="btn btn-primary" onClick={() => setPage("register")}>Register</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setPage("products")}>Products</button>
              <button className="btn btn-ghost" onClick={() => setPage("basket")}>🛍 Basket</button>
              <button className="btn btn-ghost" onClick={() => setPage("feedback")}>Feedback</button>
              {userRole === "ADMIN" && (
                <button className="btn btn-ghost" onClick={() => setPage("admin")}>
                  <span className="badge badge-admin">Admin</span>
                </button>
              )}
              <button className="btn btn-danger" onClick={() => {
                setUserId(null);
                setUserEmail("");
                setUserRole("");
                setPage("login");
              }}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Pages */}
      {page === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {page === "register" && <Register />}
      {page === "products" && <ProductList userId={userId} />}
      {page === "basket" && <Basket userId={userId} />}
      {page === "feedback" && <Feedback userId={userId} userEmail={userEmail} />}
      {page === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;