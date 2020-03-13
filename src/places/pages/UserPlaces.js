import React from 'react'

// import './UserPlaces.css'

import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom';

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
  const userId = useParams().userId
  return (
    <PlaceList items={DUMMY_PLACES.filter(place => place.creatorId === userId)}/>
  )
}