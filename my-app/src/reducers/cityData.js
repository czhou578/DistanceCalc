import { saveDestinationCity, saveFirstCity, saveUserEnteredCities } from "../actions";

const initialState = {
  userEnteredFromCity: '',
  userEnteredToCity: '',
  cityName: '',
  finalCity: ''
}

export const cityReducer = (state = {value: initialState}, action) => {
  switch (action.type) {
    case saveUserEnteredCities:
      return {
        value: {
          userEnteredFromCity: action.startCity,
          userEnteredToCity: action.endCity,
          ...state.value
        }
      }
    case saveFirstCity:
        return {value: state.value.cityName + "Colin"}
    case saveDestinationCity:
        return {value: state.value.finalCity + "Cosun"}
    default:
      return state;
  }
}