import React from "react";
import "./CarCard.css";
import AudiImage from "../../assets/images/cars-big/passat-box.png";
import BMWImage from "../../assets/images/cars-big/bmw-box.png";
import { useNavigate } from "react-router-dom";

function CarCard({ id, model, price }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("card clicked", id);
    navigate(`/cars/${id}/update`);
  };

  const handlePressDelete = async () => {
    alert("Are you sure you want to delete this car?");
    const response = await fetch(`http://localhost:3000/cars/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Error deleting car");
      return;
    }
    navigate("/cars", { state: { refresh: true } });
  };

  return (
    <div className="card-container">
      <div className="card" onClick={handleCardClick}>
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
      <button className="delete-button" onClick={handlePressDelete}>
        Delete
      </button>
    </div>
  );
}

export default CarCard;
