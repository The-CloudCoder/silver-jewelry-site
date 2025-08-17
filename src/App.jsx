import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import "bootstrap/dist/css/bootstrap.min.css";
import products from "./products.json";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./sections/Footer";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
const categories = [...new Set(products.map((p) => p.category))];
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-nav">
  <div className="container">
    {/* Logo + Brand */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
        src="/images/logo3.png" // Replace with your logo path
        alt="Swarom Silver Logo"
        style={{ height: "60px", marginRight: "10px" }}
      />
      
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/shop">Shop</Link></li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="categoryDropdown" role="button" data-bs-toggle="dropdown">
            Categories
          </a>
          <ul className="dropdown-menu">
            {categories.map((cat) => (
              <li key={cat}>
                <Link className="dropdown-item" to={`/category/${cat.toLowerCase()}`}>{cat}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="nav-item"><Link className="nav-link" to="/cart">Cart ({cart.length})</Link></li>
      </ul>
    </div>
  </div>
</nav>


      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
         <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
      
{/* Footer */}
<Footer />
    </Router>
    
  );
}
