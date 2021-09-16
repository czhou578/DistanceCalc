import React from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import increment from '../actions/index'
import decrement from '../actions/index'
import counterReducer from "../reducers/counter";
import styles from './satisForm.module.css'

export default function IncrementBtn(props) {
  const {addition} = props

  const dispatch = useDispatch()

  return (
    <div>
      {addition ? <button className={styles.ratingBtn} onClick={() => dispatch(increment())} type="button"> + </button> : 
      <button className={styles.ratingBtn} onClick={() => dispatch(decrement())} type="button"> - </button> }
    </div>
  )
}