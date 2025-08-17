import React from "react";

export default function Testimonials() {
  return (
    <div className="bg-light py-5">
      <div className="container text-center">
        <h2>What Our Customers Say</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="p-3 border rounded bg-white shadow-sm">
              <p>"Great products and fast delivery!"</p>
              <h6>- Sarah</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-white shadow-sm">
              <p>"Amazing customer service!"</p>
              <h6>- John</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-white shadow-sm">
              <p>"I love shopping here, 5 stars!"</p>
              <h6>- Emily</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
