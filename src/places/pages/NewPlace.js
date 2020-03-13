import React from 'react'

import './PlaceForm.css'

import { useForm } from '../../shared/hooks/form'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'



export default () => {

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
  },
    false
  )

  const submitHandler = event => {
    event.preventDefault()
    console.log(state.inputs)
  }


  return (
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
  )
}