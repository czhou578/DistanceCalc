import counterReducer from "./counter";
import isSubmittedReducer from "./isLogged";
import { geoCityReducer } from "./cityData";
import { cityReducer } from "./cityData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  cityReducer: cityReducer,
  geoCityReducer: geoCityReducer,
  counter: counterReducer,
  isSubmittedReducer: isSubmittedReducer
})

export default allReducers