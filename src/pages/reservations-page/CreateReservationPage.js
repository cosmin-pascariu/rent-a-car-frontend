import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReservationsAction } from "../../store/actions/reservationsActions";

const CreateReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.cars);

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    carId: "",
    totalPrice: "",
    clientId: "",
    reservationStatus: "",
  });

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM", formData);
    const response = await fetch(
      `http://localhost:3000/reservations/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      dispatch(getReservationsAction());
      navigate(`/reservations`);
    }
  };

  useEffect(() => {
    if (id) {
      const getReservation = async () => {
        const response = await fetch(
          `http://localhost:3000/reservations/${id}/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Allow-Access-Control-Origin": "*",
            },
          }
        );
        const data = await response.json();
        setFormData(data);
      };
      getReservation();
    }
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <div className="space"></div>
      <h1>{id ? "Edit Reservation" : "Create Reservation"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          onChange={handleChange}
          value={formData.startDate}
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          required
          onChange={handleChange}
          value={formData.endDate}
        />

        <label htmlFor="carId">Car Model</label>
        <select
          id="carId"
          name="carId"
          required
          onChange={handleChange}
          value={formData.carId}
        >
          <option value="" disabled>
            Select Car Model
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.model}
            </option>
          ))}
        </select>

        <label htmlFor="clientId">Client</label>
        <select
          id="clientId"
          name="clientId"
          required
          onChange={handleChange}
          value={formData.clientId}
        >
          <option value="" disabled>
            Select Client
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.userName}
            </option>
          ))}
        </select>

        <label htmlFor="totalPrice">Total Price</label>
        <input
          type="number"
          id="totalPrice"
          name="totalPrice"
          required
          onChange={handleChange}
          value={formData.totalPrice}
        />

        <label htmlFor="reservationStatus">Reservation Status</label>
        <select
          id="reservationStatus"
          name="reservationStatus"
          required
          onChange={handleChange}
          value={formData.reservationStatus}
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>

        <div className="row">
          <input
            type="submit"
            value={id ? "Update Reservation" : "Create Reservation"}
          />
          <button onClick={() => navigate("/reservations")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateReservationPage;
