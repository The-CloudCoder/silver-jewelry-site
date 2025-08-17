import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../sections/Slider";
import Testimonials from "../sections/Testimonials";
import products from "../products.json";
import TopSellingSlider from "../sections/TopSellingSlider";

export default function Home({ addToCart }) {
  const [category, setCategory] = useState("all");

  // Only featured products
  const featuredProducts = products.filter((p) => p.featured === 1);
     const categories = ["all", ...new Set(products.map((p) => p.category))];
  return (
    <div>
      <Slider />

      {/* Featured Products Section */}
      <div className="container my-5">
        <h2 className="mb-4 text-center">Featured Products</h2>
       {/* Category Buttons */}
        <div className="mb-3 text-center">
          {categories.map((cat, index) => (
                <Link
              key={index}
              to={cat === "all" ? "/shop" : `/category/${cat.toLowerCase()}`}
              className="btn btn-outline-primary me-2"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="row justify-content-center">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 text-center">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
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
        </div>
      </div>

      {/* Full-width Banner */}
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'url("/images/banner1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          margin: "50px 0",
        }}
      ></div>

      {/* Top Selling Slider */}
      <TopSellingSlider addToCart={addToCart} />

      <Testimonials />
    </div>
  );
}
