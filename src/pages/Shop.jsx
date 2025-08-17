import React, { useState } from "react";
import { Link } from "react-router-dom";
import Testimonials from "../sections/Testimonials";
import products from "../products.json";

export default function Home({ addToCart }) {
  // Extract unique categories from products
  const allCategories = [...new Set(products.map((p) => p.category))];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2500]); // Adjust max price based on products

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter products by selected categories and price
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCategory && matchPrice;
  });

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <h4>Filters</h4>

          {/* Category Checkboxes */}
          <div className="mb-4">
            <h6>Category</h6>
            {allCategories.map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <label className="form-check-label" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            ))}
          </div>

          {/* Price Slider */}
          <div className="mb-4">
            <h6>Price Range: ${priceRange[0]} - ${priceRange[1]}</h6>
            <input
              type="range"
              className="form-range"
              min="0"
              max="2500"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            />
            <input
              type="range"
              className="form-range mt-2"
              min="0"
              max="2500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setPriceRange([0, 2500])}
            >
              Reset Price
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-9">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="mt-auto">
                      <Link to={`/product/${product.id}`} className="btn btn-primary me-2">
                        View
                      </Link>
                      <button className="btn btn-success" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-muted">No products found for selected filters.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
