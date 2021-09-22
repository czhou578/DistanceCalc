
const initialState = {
  userEnteredFromCity: '',
  userEnteredToCity: '',
  cityName: '',
  finalCity: ''
}

const initalStateGeoCities = {
  cityOne: '',
  cityTwo: ''
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

export const geoCityReducer = (state = initalStateGeoCities, action) => {
  switch (action.type) {
    case 'saveGeoCities':
      return {
        ...state,
        cityOne: action.cityOne,
        cityTwo: action.cityTwo
      }
  
    default:
      return state;
  }
}