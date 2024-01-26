import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./ReservationsPage.css";
import ReservationCard from "../../components/reservation-card/ReservationCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservationsAction } from "../../store/actions/reservationsActions";
import { getCarsAction } from "../../store/actions/carsActions";
import { getUsersAction } from "../../store/actions/usersActions";

const ReservationsPage = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const dispatch = useDispatch();

  const { reservations } = useSelector((state) => state.reservations);
  const { cars } = useSelector((state) => state.cars);
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();

  console.log("RESERVATIONS", reservations);
  console.log("CARS", cars);
  console.log("USERS", users);

  useEffect(() => {
    if (reservations.length > 0 && cars.length > 0 && users.length > 0) {
      setReservationsData(reservations);
      setCarsData(cars);
      setUsersData(users);
    } else {
      dispatch(getReservationsAction());
      dispatch(getCarsAction());
      dispatch(getUsersAction());
    }
  }, [reservations, cars, users]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="space"></div>
      <div className="header-container">
        <button
          className="add-button"
          onClick={() => navigate("/reservations/create-reservation")}
        >
          Add Reservation
        </button>
        <h1>Reservations</h1>
        <h4
          style={{ color: "white" }}
          onClick={() => {
            alert("This feature is not implemented yet");
          }}
        >
          Filters
        </h4>
      </div>
      {reservationsData.length > 0 ? (
        <div className="reservations-container">
          {reservationsData.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              id={reservation.id}
              clientName={
                usersData.find((user) => user.id === reservation.clientId)
                  .userName
              }
              carName={
                carsData.find((car) => car.id === reservation.carId).model
              }
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              carModel={reservation.carId}
              totalPrice={reservation.totalPrice}
            />
          ))}
        </div>
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default ReservationsPage;
