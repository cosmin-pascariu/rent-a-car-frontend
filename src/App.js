import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarsPage from "./pages/cars-page/CarsPage";
import HomePage from "./pages/home-page/HomePage";
import AddCarPage from "./pages/cars-page/AddCarPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="cars" element={<CarsPage />} />
          <Route path="cars/add" element={<AddCarPage />} />
          <Route path="cars/:id/update" element={<AddCarPage />} />
          <Route path="*" element={<h1>ERROR 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
