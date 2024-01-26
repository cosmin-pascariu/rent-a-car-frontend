import {
  ADD_RESERVATION,
  GET_RESERVATIONS,
  REMOVE_RESERVATION,
} from "../constants/constants";

export const getReservations = (reservations) => {
  return {
    type: GET_RESERVATIONS,
    payload: reservations,
  };
};

export const addReservation = (reservation) => {
  return {
    type: ADD_RESERVATION,
    payload: reservation,
  };
};

export const removeReservation = (id) => {
  return {
    type: REMOVE_RESERVATION,
    payload: id,
  };
};

export const getReservationsAction = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(getReservations(data));
  };
};

export const addReservationAction = (formData) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(addReservation(data));
  };
};

export const removeReservationAction = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeReservation(id));
    }
  };
};
