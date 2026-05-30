import { useState, useEffect } from "react";
import api from "../axiosConfig";

function Basket({ userId }) {
  const [basketItems, setBasketItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/basket/${userId}`
      );
      setBasketItems(response.data);
    } catch (error) {
      setMessage("Could not load basket!");
    }
    setLoading(false);
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/api/basket/remove/${itemId}`);
      setMessage("Item removed!");
      setTimeout(() => setMessage(""), 2000);
      fetchBasket();
    } catch (error) {
      setMessage("Could not remove item!");
    }
  };

  const totalPrice = basketItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h2 className="page-title">My Basket</h2>

      {message && (
        <p style={{ color: "#34c759", fontWeight: "500", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : basketItems.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ fontSize: "48px" }}>🛍</p>
          <p style={{ color: "#6e6e73", marginTop: "10px" }}>
            Your basket is empty!
          </p>
        </div>
      ) : (
        <div>
          {basketItems.map((item) => (
            <div key={item.id} className="basket-item">
              <div>
                <p style={{ fontWeight: "600" }}>🧃 Product ID: {item.productId}</p>
                <p style={{ color: "#6e6e73", fontSize: "14px" }}>
                  Quantity: {item.quantity}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <p style={{ fontWeight: "700", color: "#0071e3", fontSize: "18px" }}>
                  ₹{item.price}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="basket-total">
            <span>Total</span>
            <span style={{ color: "#0071e3" }}>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              fontSize: "16px",
              marginTop: "16px",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Basket;