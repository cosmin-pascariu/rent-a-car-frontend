import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./CarsPage.css";
import CarCard from "../../components/car-card/CarCard";

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [carModels, setCarModels] = useState([]);

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

  const getCarModels = async () => {
    const response = await fetch("http://localhost:3000/car-models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
    });
    const data = await response.json();
    console.log("car models", data);
    setCarModels(data);
  };

  useEffect(() => {
    getCars();
    getCarModels();
  }, []);

  return (
    <div className="container">
      <Navbar />
      {cars.length > 0 ? (
        <div className="cars-container">
          {cars.map((car) => (
            <CarCard key={car.id} model={car.model} price={car.pricePerDay} />
          ))}
        </div>
      ) : (
        <p>No cars found</p>
      )}
    </div>
  );
}

export default CarsPage;
