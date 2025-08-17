import React from "react";

export default function Cart({ cart }) {
  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ${item.price}
              <span className="badge bg-primary">{index + 1}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
