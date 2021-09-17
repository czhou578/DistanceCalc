 export const incrementType = () => {
  return {
    type: 'increment'
  }
}

export const decrementType = () => {
  return {
    type: 'decrement'
  }
}

export const resetStore = () => {
  return {
    type: 'reset'
  }
}

export const saveFirstCity = (error) => {
  return {
    type: 'enteredFirstCity',
    error: error
  }
}

export const saveDestinationCity = (error) => {
  return {
    type: 'enteredDestinationCity',
    error: error
  }
}


