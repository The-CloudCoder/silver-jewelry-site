import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../products.json";

export default function TopSellingSlider() {
  const topSellingProducts = products.filter((p) => p.topSelling === 1);
  const [chunkSize, setChunkSize] = useState(3); // default 3 images per slide
  const [slides, setSlides] = useState([]);

  // Function to split array into chunks
  const createSlides = (size) => {
    const temp = [];
    for (let i = 0; i < topSellingProducts.length; i += size) {
      temp.push(topSellingProducts.slice(i, i + size));
    }
    setSlides(temp);
  };

  // Update chunkSize based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setChunkSize(1); // mobile
      } else if (window.innerWidth < 992) {
        setChunkSize(2); // tablet
      } else {
        setChunkSize(3); // desktop
      }
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Re-create slides whenever chunkSize changes
  useEffect(() => {
    createSlides(chunkSize);
  }, [chunkSize]);

  if (topSellingProducts.length === 0) return null;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Top Selling Products</h2>
      <div
        id="topSellingCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {slides.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="row justify-content-center">
                {group.map((product) => (
                  <div key={product.id} className="col-auto">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#topSellingCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#topSellingCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
