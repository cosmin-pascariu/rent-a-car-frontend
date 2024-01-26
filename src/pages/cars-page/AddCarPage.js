import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./AddCarPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getCarsAction } from "../../store/actions/carsActions";
import { useDispatch } from "react-redux";

function AddCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    availabilityStatus: "",
    description: "",
    ownerId: "",
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
    console.log("USERS", data);
    setUsers(data);
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
    getCarModels();
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM", formData);
    const response = await fetch(
      `http://localhost:3000/cars/${id ? id + "/update" : "create"}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      dispatch(getCarsAction());
      navigate(`/cars`);
    }
  };

  useEffect(() => {
    if (id) {
      const getCar = async () => {
        const response = await fetch(
          `http://localhost:3000/cars/${id}/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Allow-Access-Control-Origin": "*",
            },
          }
        );
        const data = await response.json();
        console.log("CAR details", data);
        setFormData(data);
      };
      getCar();
    }
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <div className="space"></div>

      <h1>{id ? "Edit car" : "Add car"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="make">Transmission</label>
        <select
          id="make"
          name="make"
          required
          onChange={handleChange}
          value={formData.make}
        >
          <option value="" disabled>
            Select Transmission
          </option>
          <option value={"manual"}>Manual</option>
          <option value={"automated"}>Automated</option>
        </select>

        <label htmlFor="model">Model</label>
        <select
          id="model"
          name="model"
          required
          onChange={handleChange}
          value={formData.model}
        >
          <option value="" disabled>
            Select Model
          </option>
          {carModels.map((car) => (
            <option key={car.id} value={car.name}>
              {car.name}
            </option>
          ))}
        </select>
        <label for="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          required
          onChange={handleChange}
          value={formData.year}
        />

        <label for="pricePerDay">Price per day</label>
        <input
          type="number"
          id="pricePerDay"
          name="pricePerDay"
          required
          onChange={handleChange}
          value={formData.pricePerDay}
        />
        <label htmlFor="availabilityStatus">Availability status</label>
        <select
          id="availabilityStatus"
          name="availabilityStatus"
          required
          onChange={handleChange}
          value={formData.availabilityStatus}
        >
          <option value="" disabled>
            Select availability status
          </option>
          <option value={"true"}>Is available</option>
          <option value={"false"}>Not available</option>
        </select>

        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          required
          onChange={handleChange}
          value={formData.description}
        />

        {!id && (
          <>
            <label htmlFor="ownerId">Owner</label>
            <select
              id="ownerId"
              name="ownerId"
              required
              onChange={handleChange}
              value={formData.ownerId}
            >
              <option value="" disabled>
                Select Owner
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="row">
          <input type="submit" value={id ? "Update car" : "Add car"} />
          <button onClick={() => navigate("/cars")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCarPage;
