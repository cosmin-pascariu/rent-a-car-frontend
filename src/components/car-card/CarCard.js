import React from "react";
import "./CarCard.css";
import AudiImage from "../../assets/images/cars-big/passat-box.png";
import BMWImage from "../../assets/images/cars-big/bmw-box.png";

function CarCard({ model, price }) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <img
            src={model.includes("BMW") ? BMWImage : AudiImage}
            alt="car"
            className="card-image"
          />

          <div className="card-title">
            <h3>{model}</h3>
          </div>

          <div className="card-price">
            <p>${price} / rent per day</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
