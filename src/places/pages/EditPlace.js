import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './PlaceForm.css'

import { useForm } from '../../shared/hooks/form'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'



const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.748427,
      lng: -73.985563
    },
    creatorId: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.748427,
      lng: -73.985563
    },
    creatorId: 'u2'
  },
]


export default props => {

  const [isLoading, setIsLoading] = useState(true)

  const placeId = useParams().placeId

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)

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

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card><h2>Could not find place!</h2></Card>
      </div>
    )
  }

  useEffect(() => {
    setFormData({
      title: {
        value: identifiedPlace.title,
        isValid: true
      },
      description: {
        value: identifiedPlace.description,
        isValid: true
      }
    }, true)
    setIsLoading(false)
  }, [setFormData, identifiedPlace])

  const submitHander = event => {
    event.preventDefault()
    console.log(state.inputs)
  }


  if (isLoading) {
    return <Card>
      <h2>Is Loading ...</h2>
    </Card>
  }

  return (
    <form className="place-form" onSubmit={submitHander}>
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
        type="submit"
        disabled={!state.isValid}
      >
        SAVE PLACE
      </Button>
    </form>
  )
}