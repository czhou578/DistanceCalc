import { saveDestinationCity, saveFirstCity, saveUserEnteredCities } from "../actions";

const initialState = {
  userEnteredFromCity: '',
  userEnteredToCity: '',
  cityName: '',
  finalCity: ''
}

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'saveUserEnteredCities':
      return {
        ...state,
        userEnteredFromCity: action.startCity,
        userEnteredToCity: action.endCity
      }
    default:
      return state;
  }
}