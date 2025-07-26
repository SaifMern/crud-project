import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product!");
      }
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add" className="add-product-link">➕ Add New Product</Link>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className={product.stock < 5 ? "low-stock" : ""}>
            <div className="product-info">
              {product.name} - <strong>${product.price}</strong> (Stock: {product.stock})
              {product.stock < 5 && <span className="alert">⚠️ Low Stock!</span>}
            </div>
            <div className="product-actions">
              <Link to={`/edit/${product._id}`}>
                <button>✏️ Edit</button>
              </Link>
              <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
