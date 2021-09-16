import React from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import increment from '../actions/index'
import styles from './satisForm.module.css'

export default function IncrementBtn() {

  const dispatch = useDispatch()

  return (
    <div>
      <button className={styles.ratingBtn} onClick={() => dispatch(increment())} type="button"> + </button>
    </div>
  )
}