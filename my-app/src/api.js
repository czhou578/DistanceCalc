import { combineReducers, createSlice } from "@reduxjs/toolkit";

const distanceCalcSlice = createSlice({
  name: "DistanceCalc",
  initialState: {
    history: [],
  },
  reducers: {
    setDistanceHistory(state, action) {
      state.history = state.history.push(action.payload);
    },
  },
});

const latLongCalcSlice = createSlice({
  name: "LatLongCalc",
  initialState: {
    history: [],
  },
  reducers: {
    setLatLongHistory(state, action) {
      state.history = state.history.push(action.payload);
    },
  },
});

export const { setDistanceHistory } = distanceCalcSlice.actions;
export const { setLatLongHistory } = latLongCalcSlice.actions;

const reducers = combineReducers({
  distanceHistory: distanceCalcSlice.reducer,
  latLongHistory: latLongCalcSlice.reducer,
});

export default reducers;
