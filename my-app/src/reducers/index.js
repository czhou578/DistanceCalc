import counterReducer from "./counter";
import isLoggedReducer from "./isLogged";
import { cityReducer } from "./cityData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  cityReducer: cityReducer,
  counter: counterReducer,
  loggedReducer: isLoggedReducer
})

export default allReducers