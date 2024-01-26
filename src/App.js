import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CarsPage from "./pages/cars-page/CarsPage";
import HomePage from "./pages/home-page/HomePage";
import AddCarPage from "./pages/cars-page/AddCarPage";
import ReservationsPage from "./pages/reservations-page/ReservationsPage";
import CreateReservationPage from "./pages/reservations-page/CreateReservationPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import { useSelector } from "react-redux";

function App() {
  let savedToken = localStorage.getItem("authToken");
  const { token } = useSelector((state) => state.auth);

  let isAuthenticated = token.accessToken || savedToken;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={!isAuthenticated ? <LoginPage /> : <HomePage />}
          />
          <Route
            path="register"
            element={!isAuthenticated ? <RegisterPage /> : <HomePage />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="cars"
            element={isAuthenticated ? <CarsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="cars/add"
            element={
              isAuthenticated ? <AddCarPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="cars/:id/update"
            element={
              isAuthenticated ? <AddCarPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/reservations"
            element={
              isAuthenticated ? <ReservationsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/reservations/:id/update"
            element={
              isAuthenticated ? (
                <CreateReservationPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="reservations/create-reservation"
            element={
              isAuthenticated ? (
                <CreateReservationPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<h1>ERROR 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
