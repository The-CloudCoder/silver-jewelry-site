import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../products.json";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) return <h2 className="text-center my-5">Product not found</h2>;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Image Gallery */}
        <div className="col-md-6">
          <img
            src={mainImage}
            className="img-fluid mb-3"
            alt={product.name}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="d-flex flex-wrap">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="img-thumbnail me-2 mb-2"
                style={{ width: "70px", height: "70px", cursor: "pointer", objectFit: "cover" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>

          {/* Tags */}
          <div className="mb-3">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="badge bg-primary me-2">
                {tag}
              </span>
            ))}
          </div>

          <button className="btn btn-success" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
