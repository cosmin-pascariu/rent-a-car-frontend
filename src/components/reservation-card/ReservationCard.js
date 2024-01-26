import React from "react";
import { removeReservationAction } from "../../store/actions/reservationsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReservationCard = ({
  id,
  clientName,
  carName,
  startDate,
  endDate,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    alert("Are you sure you want to cancel this reservation?");
    dispatch(removeReservationAction(id));
  };

  const handleCardClick = () => {
    console.log("card clicked", id);
    navigate(`/reservations/${id}/update`);
  };

  const checkPenalty = async () => {
    const response = await fetch(
      `http://localhost:3000/reservations/${id}/penalty`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (new Date(endDate) < new Date()) {
      alert(data);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{clientName + " - " + carName}</h2>
          <p className="card-description">
            Start Date: {startDate.split("T")[0]}
          </p>
          <p className="card-description">End date: {endDate.split("T")[0]}</p>
          <p className="card-price">Total Price: ${totalPrice}</p>
          <button className="card-button" onClick={() => checkPenalty()}>
            Check Penalty
          </button>
          <button className="card-button" onClick={() => handleCardClick()}>
            View Details
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
