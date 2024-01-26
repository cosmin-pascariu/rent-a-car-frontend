import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./CarsPage.css";
import CarCard from "../../components/car-card/CarCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CarsPage() {
  const [carsData, setCarsData] = useState([]);
  const { cars } = useSelector((state) => state.cars);
  const navigate = useNavigate();

  useEffect(() => {
    setCarsData(cars);
  }, [cars]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="space"></div>
      <div className="header-container">
        <button className="add-button" onClick={() => navigate("/cars/add")}>
          Add Car
        </button>
        <h1>Reservations</h1>
        <div>Filters</div>
      </div>
      {carsData.length > 0 ? (
        <div className="cars-container">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              model={car.model}
              price={car.pricePerDay}
            />
          ))}
        </div>
      ) : (
        <p>No cars found</p>
      )}
    </div>
  );
}

export default CarsPage;
