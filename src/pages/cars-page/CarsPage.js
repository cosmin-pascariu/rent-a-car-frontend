import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./CarsPage.css";
import CarCard from "../../components/car-card/CarCard";
import { useLocation } from "react-router-dom";

function CarsPage() {
  const [cars, setCars] = useState([]);
  const location = useLocation();

  const getCars = async () => {
    const response = await fetch("http://localhost:3000/cars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
    });
    const data = await response.json();
    console.log(data);
    setCars(data);
  };

  useEffect(() => {
    if (location.state?.refresh) {
      getCars();
    }
  }, [location.state]);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="space"></div>
      <h1>Cars</h1>
      {cars.length > 0 ? (
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
