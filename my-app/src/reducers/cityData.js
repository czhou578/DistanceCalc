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
      console.log('appeared here')
      console.log('action startcity: ' + action.startCity)
      return {
        ...state,
        userEnteredFromCity: action.startCity,
        userEnteredToCity: action.endCity
      }
    default:
      console.log('this is default')
      return state;
  }
}