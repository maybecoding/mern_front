import React, { useEffect, useState, useContext } from 'react'

import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom';
import { useHttp } from '../../shared/hooks/http'
import { AuthContext } from '../../shared/context/auth'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'



const UserPlaces = () => {
  const [places, setPlaces] = useState()
  const { send, isLoading, errorMessage, errorClear } = useHttp()
  const {token} = useContext(AuthContext)

  const userId = useParams().userId

  useEffect(() => {
    send(`http://localhost:5000/api/places/user/${userId}`)
      .then(response => {
        setPlaces(response.places)
      })
  }, [userId, send])

  const deletePlaceById = id => {
    send(`http://localhost:5000/api/places/${id}`, 'DELETE', null, token).then(() => {
      setPlaces(places => places.filter(p => p.id !== id))
    })
  }


  return <>
    <ErrorModal error={errorMessage} onClear={errorClear} />
    {isLoading && <LoadingSpinner asOverlay />}
    {places && !isLoading && <PlaceList items={places} deletePlaceById={deletePlaceById} />}
  </>
}

export default UserPlaces