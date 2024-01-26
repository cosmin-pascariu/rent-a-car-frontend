import { LOGIN, LOGOUT, REGISTER } from "../constants/constants";

const initialState = {
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGOUT:
      return {
        ...state,
        token: "",
      };
    case REGISTER:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
