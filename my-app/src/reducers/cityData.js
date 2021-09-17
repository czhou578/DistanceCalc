import { saveDestinationCity, saveFirstCity } from "../actions";

const initialState = {
  cityName: '',
  finalCity: ''
}

export const cityReducer = (state = {value: initialState}, action) => {
  switch (action.type) {
    case saveFirstCity:
        return {value: state.value.cityName + "Colin"}
    case saveDestinationCity:
        return {value: state.value.finalCity + "Cosun"}
    default:
      state;
  }
}