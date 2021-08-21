import React, { Component, useEffect, useRef, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './satisForm.module.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { createStore, combineReducers} from 'redux';

export default function SatisfactionForm(props) {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [count, setCount] = useState(1)
  const ref1 = useRef();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  useEffect(() => {
    console.log('hello')
  })

  const validationSchema = yup.object({
    firstName: yup.string().required('Required').min(1, 'Must enter an FirstName'),
    lastName: yup.string().required('Required').min(1, 'Must enter an lastName'),
    email: yup.string().required('Required').min(1, 'Must enter an email')
  })

  const incrementCount = (count) => {
    console.log('incremented')
    if (count == 10) {
      console.log('this cannot happen')
    }
    return setCount(count => count + 1)
  }

  const fName = () => {
    return {
      type: 'addedFirstName'
    }
  }

  const lName = () => {
    return {
      type: 'addedLastName'
    }
  }

  const updateNameReducer = (state = '', action) => {
    switch (action.type) {
      case 'addedFirstName':
        return state + "text  "
      case 'addedLastName':
        return state + "text2"
      default:
        return state;
    } 
  }

  const allReducers = combineReducers({
    updateName: updateNameReducer
  })

  let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  store.subscribe(() => console.log(store.state))

  const onSubmit = () => {
    submitDispatch()
  }
  
  const submitDispatch = () => {
    // e.stopPropagation();
    console.log('submit')
    store.dispatch(lName())
    store.dispatch(fName())    
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      update: () => dispatch(lName())
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange={true}
      onSubmit={submitDispatch}
    >
      {(formProps) => {
        const {
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
          values,
          handleBlur,
          handleReset,
          errors,
          touched,
          helperText
        } = formProps;
        return (
          <div>
            <h1>Want to Subscribe?</h1>
            <div className={styles['text-wrapper']}>
              <form action="submit" onSubmit={handleSubmit} onReset={handleReset}>
                <TextField 
                id="standard-basic" 
                label="First Name" 
                color="red"
                  onChange={handleChange}
                  name="firstName"
                  value={values.firstName}  
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <div>
                  <TextField 
                    id="standard-basic2" 
                    label="Last Name" 
                    color="red" 
                    value={values.lastName} 
                    onChange={handleChange} 
                    name="lastName" 
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}

                    />
                </div>
                <div>
                  <TextField 
                  id="standard-basic3" 
                  label="Email Address" 
                  color="red" 
                  value={values.email} 
                  onChange={handleChange} 
                  name="email" 
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}

                  />
                </div>
                {/* <div className={styles.rating}>
                  Rating (1-10)
                  <button id="addBtn" onClick={incrementCount} className={styles.btn} type="button">
                    +
                  </button>
                  <div ref={ref1}>{count}</div>
                </div> */}
                <Button variant="contained" color="primary" isValid={isValid} isSubmitting={isSubmitting} dirty={dirty} onClick={onSubmit} type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}