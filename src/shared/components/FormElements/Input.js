import React, { useReducer, useEffect } from 'react'

import './Input.css'

import { validate } from '../../../utils/validators'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators)
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      }
    default:
      return state
  }
}

export default props => {
  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators
    })
  }
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    })
  }

  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialIsValid === undefined ? false : props.initialIsValid,
    isTouched: false
  })

  const { id, onInput } = props
  const { value, isValid } = state

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const element = props.element === 'input' ?
    <input
      id={props.id}
      value={state.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
    />
    :
    <textarea
      id={props.id}
      value={state.value}
      rows={props.rows || 3}
      onChange={changeHandler}
      onBlur={touchHandler}
    />

  return (
    <div className={`form-control ${!state.isValid && state.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
    </div>
  )
}