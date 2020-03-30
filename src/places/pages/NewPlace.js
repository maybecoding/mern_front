import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import './PlaceForm.css'

import { useForm } from '../../shared/hooks/form'
import { useHttp } from '../../shared/hooks/http'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { ContextAuth } from '../../shared/context/auth'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'



const NewPlace = () => {

  const { send, errorMessage, errorClear, isLoading } = useHttp()

  const { userId } = useContext(ContextAuth)

  const history = useHistory()

  const [state, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
  }, false)

  const submitHandler = event => {
    event.preventDefault()
    send('http://localhost:5000/api/places', 'POST', {
      title: state.inputs.title.value,
      description: state.inputs.description.value,
      address: state.inputs.address.value,
      creatorId: userId
    }).then(() => {
      history.push(`/${userId}/places`)
    })
  }


  return <>
    <ErrorModal error={errorMessage} onClear={errorClear}/>
    {isLoading && <LoadingSpinner asOverlay />}
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter valid title."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Please enter valid description (at least 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        errorText="Please enter valid address."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button
        type="submit"
        disabled={!state.isValid}
      >
        ADD PLACE
        </Button>
    </form>
  </>
}

export default NewPlace