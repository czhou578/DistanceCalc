const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case "increment":
      if (state.value < 10) {
        return { value: state.value + 1 };
      }
    case "decrement":
      if (state.value > 0) {
        return { value: state.value - 1 };
      }
    case "reset":
      return { value: (state.value = 0) };
    default:
      return state;
  }
};

export default counterReducer;
