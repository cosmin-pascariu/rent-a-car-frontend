import {
  ADD_RESERVATION,
  GET_RESERVATIONS,
  REMOVE_RESERVATION,
} from "../constants/constants";

const initialState = {
  reservations: [],
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS: {
      return {
        ...state,
        reservations: action.payload,
      };
    }
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    case REMOVE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reservationsReducer;
