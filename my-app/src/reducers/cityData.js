const initialState = {
  userEnteredFromCity: "",
  userEnteredToCity: "",
  startCityAbrev: "",
  endCityAbrev: "",
};

const initalStateGeoCities = {
  cityOne: "",
  cityTwo: "",
};

const geoCityResultsInit = {
  firstCityLatitude: "",
  secondCityLatitude: "",
  firstCityLongitude: "",
  secondCityLongitude: "",
};

const initCityResults = {
  distance: null,
  travelTime: null,
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "saveUserEnteredCities":
      return {
        ...state,
        userEnteredFromCity: action.startCity,
        userEnteredToCity: action.endCity,
        startCityAbrev: action.startCityAbrev,
        endCityAbrev: action.endCityAbrev,
      };
    default:
      return state;
  }
};

export const geoCityReducer = (state = initalStateGeoCities, action) => {
  switch (action.type) {
    case "saveGeoCities":
      return {
        ...state,
        cityOne: action.cityOne,
        cityTwo: action.cityTwo,
      };

    default:
      return state;
  }
};

export const firstGeoCityReducerResults = (
  state = geoCityResultsInit,
  action
) => {
  switch (action.type) {
    case "firstCityResults":
      return {
        ...state,
        firstCityLatitude: action.c1Latitude,
        firstCityLongitude: action.c1Longitude,
      };
    case "secondCityResults":
      return {
        ...state,
        secondCityLatitude: action.c2Latitude,
        secondCityLongitude: action.c2Longitude,
      };

    default:
      return state;
  }
};

export const retrievedInitCityResults = (state = initCityResults, actions) => {
  switch (actions.type) {
    case "saveCityResults":
      return {
        distance: actions.distance,
        travelTime: actions.time,
      };
    default:
      return state;
  }
};
