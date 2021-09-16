import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../actions/index'

export default function IncrementBtn(props) {
  const {state, handler} = props

  const counterShow = useSelector(state => state.counter.value)
  const dispatch = useDispatch();

  if (state) {
    dispatch(actionType.resetStore())
    handler(false)
  }

  const styles = {
    display: 'flex'
  }

  const styles2 = {
    marginLeft: '20px'
  }

  return (
    <div style={styles}>
      <div>
        <button className={styles.ratingBtn} onClick={() => dispatch(actionType.incrementType())} type="button"> + </button>
      </div>
      <div style={styles2}>
        <span>{counterShow}</span>
      </div>
      <div style={styles2}>
        <button className={styles.ratingBtn} onClick={() => dispatch(actionType.decrementType())} type="button"> - </button>
      </div>
    </div>
  )
}