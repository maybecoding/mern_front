import React, { useState, useContext } from 'react'

import './Auth.css'

import { useForm } from '../../shared/hooks/form'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { ContextAuth } from '../../shared/context/auth'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'

export default props => {
  const auth = useContext(ContextAuth)

  const [state, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  }, false)

  const [isLoginMode, setIsLoginMode] = useState(true)

  const submitForm = event => {
    event.preventDefault()
    console.log(state.inputs)
    auth.login(state.inputs)
  }

  const switchHandler = () => {
    if (!isLoginMode) {
      const { name: _, ...newInputs } = state.inputs
      setFormData(newInputs, state.inputs.email.isValid && state.inputs.password.isValid)
    } else {
      setFormData({
        ...state.inputs, name: {value: '', isValid: false}
      }, false)
    }
    setIsLoginMode(currentIsLoginMode => !currentIsLoginMode)
  }

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={submitForm}>
        {!isLoginMode && <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          errorText="Please enter valid name."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />}
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          errorText="Please enter valid email."
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          errorText="Please enter valid password, at least 5 characters."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Button disabled={!state.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchHandler}>SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}</Button>
    </Card>
  )
}