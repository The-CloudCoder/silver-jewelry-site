import React from "react";
import hero1 from "../../images/hero1.png"
import hero2 from "../../images/hero2.png";
import hero3 from "../../images/hero3.png";

export default function Slider() {
  return (
    <div id="heroSlider" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={hero1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={hero2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={hero3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
