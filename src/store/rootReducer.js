import { combineReducers } from "redux";
import carsModelsReducer from "./reducers/carsModelsReducer";
import reservationsReducer from "./reducers/reservationsReducer";
import carsReducer from "./reducers/carsReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  carsModels: carsModelsReducer,
  reservations: reservationsReducer,
  cars: carsReducer,
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
