import { ADD_CAR, GET_CARS, REMOVE_CAR } from "../constants/constants";

const initialState = {
  cars: [],
};

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };
    case REMOVE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
    default:
      return state;
  }
};

export default carsReducer;
