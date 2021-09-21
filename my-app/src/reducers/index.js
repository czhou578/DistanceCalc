import counterReducer from "./counter";
import isSubmittedReducer from "./isLogged";
import { cityReducer } from "./cityData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  cityReducer: cityReducer,
  counter: counterReducer,
  isSubmittedReducer: isSubmittedReducer
})

export default allReducers