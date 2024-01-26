import { GET_CARS_MODELS } from "../constants/constants";

export const getCarsModels = (carsModels) => {
  return {
    type: GET_CARS_MODELS,
    payload: carsModels,
  };
};

export const getCarsModelsAction = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/car-models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(getCarsModels(data));
  };
};
