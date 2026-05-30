import { useState, useEffect } from "react";
import api from "../axiosConfig";

function ProductList({ userId }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      setMessage("Could not load products!");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/products/search?name=${search}`);
      setProducts(response.data);
    } catch (error) {
      setMessage("Search failed!");
    }
    setLoading(false);
  };

  const addToBasket = async (productId) => {
    try {
      const response = await api.post(`/api/basket/add?userId=${userId}&productId=${productId}&quantity=1`);
      setMessage(response.data);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Could not add to basket!");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Our Products</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={fetchProducts}>
          Show All
        </button>
      </div>

      {/* Message */}
      {message && (
        <p style={{ color: "#34c759", fontWeight: "500", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      {/* Spinner */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🧃</div>
              <p className="product-name">{product.name}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => addToBasket(product.id)}
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;