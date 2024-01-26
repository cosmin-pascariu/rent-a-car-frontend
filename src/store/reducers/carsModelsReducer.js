// implement car-model reducer

import { GET_CARS_MODELS } from "../constants/constants";

const initialState = {
  carsModels: [],
};

const carsModelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS_MODELS:
      console.log("action", action);
      return {
        ...state,
        carsModels: action.payload,
      };
    default:
      return state;
  }
};

export default carsModelsReducer;
