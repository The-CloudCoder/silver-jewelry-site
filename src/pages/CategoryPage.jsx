import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../products.json";

export default function CategoryPage({ addToCart }) {
  const { categoryName } = useParams();

  // Filtered by category first
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Determine max price dynamically from products in this category
  const maxPriceValue =
    categoryProducts.length > 0
      ? Math.max(...categoryProducts.map((p) => p.price))
      : 1000;

  const [priceRange, setPriceRange] = useState([0, maxPriceValue]);

  // Filter products by price
  const filteredProducts = categoryProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <h4>Filters</h4>

          {/* Price Slider */}
          <div className="mb-4">
            <h6>Price Range: ${priceRange[0]} - ${priceRange[1]}</h6>
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxPriceValue}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
            />
            <input
              type="range"
              className="form-range mt-2"
              min="0"
              max={maxPriceValue}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
            />
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setPriceRange([0, maxPriceValue])}
            >
              Reset Price
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-9">
          <h2 className="mb-4">{categoryName} Products</h2>
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="mt-auto">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-primary me-2"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-muted">No products found in this price range.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
