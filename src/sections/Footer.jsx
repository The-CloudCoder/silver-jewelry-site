import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5>About Swarom Silver</h5>
            <p>
              Swarom Silver specializes in exquisite handcrafted silver jewelry including necklaces, rings, bracelets, and earrings. We believe in quality craftsmanship and timeless designs.
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@swaromsilver.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Proddatur, Andhra Pradesh, India</li>
            </ul>
          </div>

          {/* Google Map */}
          <div className="col-md-4 mb-4">
            <h5>Our Location</h5>
            <div style={{ width: "100%", height: "200px" }}>
              <iframe
                title="Swarom Silver Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.987654321!2d78.566789!3d14.750123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4abc1234567890%3A0x123456abcdef!2sProddatur%2C%20Andhra%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1692270000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        <hr className="bg-white" />

        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Swarom Silver. All rights reserved.</p>
      </div>
    </footer>
  );
}
