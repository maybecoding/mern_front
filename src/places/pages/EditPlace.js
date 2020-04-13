import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import './PlaceForm.css'

import { useForm } from '../../shared/hooks/form'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttp } from '../../shared/hooks/http'
import { AuthContext } from '../../shared/context/auth'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'



const EditPlace = () => {

  const [place, setPlace] = useState()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const { send, errorMessage, errorClear, isLoading } = useHttp()
  const { token } = useContext(AuthContext)
  const history = useHistory()

  const placeId = useParams().placeId

  const [state, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false)


  useEffect(() => {
    send(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`).then(response => {
      setPlace(response.place)
    })
  }, [placeId, send, setPlace])

  useEffect(() => {
    if (place) {
      setFormData({
        title: {
          value: place.title,
          isValid: true
        },
        description: {
          value: place.description,
          isValid: true
        }
      }, true)
      setIsInitialLoading(false)
    }
  }, [place, setFormData])

  if (isInitialLoading) {
    return <Card>
      <h2>Is Loading ...</h2>
    </Card>
  }

  if (!place) {
    return (
      <div className="center">
        <Card><h2>Could not find place!</h2></Card>
      </div>
    )
  }

  const submitHander = event => {
    event.preventDefault()
    send(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'PATCH', {
      title: state.inputs.title.value,
      description: state.inputs.description.value
    }, token).then(() => {
      history.push(`/${place.creator}/places`)
    })
  }

  return <>
    <ErrorModal error={errorMessage} onClear={errorClear} />
    <form className="place-form" onSubmit={submitHander}>
      {isLoading && <LoadingSpinner />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter valid title."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initialValue={state.inputs.title.value}
        initialIsValid={state.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Please enter valid description (at least 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initialValue={state.inputs.description.value}
        initialIsValid={state.inputs.description.isValid}
      />
      <Button
        onClick={() => { history.goBack() }}
        inverse
      >
        BACK
      </Button>
      <Button
        type="submit"
        disabled={!state.isValid}
      >
        SAVE PLACE
      </Button>
    </form>
  </>
}
export default EditPlace