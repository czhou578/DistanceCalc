const initialValue = {
  didSubmitForm: false
}

const isSubmittedReducer = (state = initialValue, action) => {
  switch(action.type) {
    case 'SUBMITTED':
      return {
        didSubmitForm: true
      }
    default: 
      return state;
  }
}

export default isSubmittedReducer