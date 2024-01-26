import { ADD_CAR, GET_CARS, REMOVE_CAR } from "../constants/constants";

export const getCars = (cars) => {
  return {
    type: GET_CARS,
    payload: cars,
  };
};

export const addCar = (car) => {
  return {
    type: ADD_CAR,
    payload: car,
  };
};

export const removeCar = (id) => {
  return {
    type: REMOVE_CAR,
    payload: id,
  };
};

export const getCarsAction = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/cars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(getCars(data));
  };
};

export const addCarAction = (formData) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(addCar(data));
  };
};

export const removeCarAction = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3000/cars/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeCar(id));
    }
  };
};
