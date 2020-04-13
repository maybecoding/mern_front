import React, { useState, useContext } from 'react'

import './Auth.css'

import { useForm } from '../../shared/hooks/form'
import { useHttp } from '../../shared/hooks/http'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'


import { AuthContext } from '../../shared/context/auth'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'


export default function Auth () {
  const {login} = useContext(AuthContext)

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
  const { send, errorMessage, isLoading, errorClear } = useHttp()


  const submitForm = event => {

    event.preventDefault()

    //prepare
    const url = `${process.env.REACT_APP_BACKEND_URL}/users/${isLoginMode ? 'login' : 'signup'}`
      ,data = isLoginMode ? {} : new FormData()
    for (let field in state.inputs) {
      if (isLoginMode) data[field] = state.inputs[field].value
      else data.append(field, state.inputs[field].value)
    }

    send(
      url,
      'POST',
      data
    ).then(response => {
      if (response && response.token) {
        login({userId: response.userId, token: response.token, tokenExpireDate: new Date(response.tokenExpireDate)})
      }
    })
  }

  const switchHandler = () => {
    if (!isLoginMode) {
      const { name: _, image: __, ...newInputs } = state.inputs
      setFormData(newInputs, state.inputs.email.isValid && state.inputs.password.isValid)
    } else {
      setFormData({
        ...state.inputs, name: { value: '', isValid: false }, image: { value: null, isValid: false }
      }, false)
    }
    setIsLoginMode(currentIsLoginMode => !currentIsLoginMode)
  }

  return <>
    <ErrorModal error={errorMessage} onClear={() => { errorClear(null) }} />
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={submitForm}>
        {!isLoginMode && <>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            errorText="Please enter valid name."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload id="image" onInput={inputHandler} center />
        </>}
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
          errorText="Please enter valid password, at least 6 characters."
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <Button disabled={!state.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchHandler}>SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}</Button>
    </Card>
  </>
}