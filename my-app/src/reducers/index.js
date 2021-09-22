import counterReducer from "./counter";
import isSubmittedReducer from "./isLogged";
import { geoCityReducer } from "./cityData";
import { cityReducer } from "./cityData";
import { combineReducers } from "redux";
import { firstGeoCityReducerResults } from "./cityData";
import { retrievedInitCityResults } from "./cityData";

const allReducers = combineReducers({
  cityReducer: cityReducer,
  geoCityReducer: geoCityReducer,
  counter: counterReducer,
  isSubmittedReducer: isSubmittedReducer,
  firstGeoCityReducerResults: firstGeoCityReducerResults,
  retrievedInitCityResults: retrievedInitCityResults
})

export default allReducers