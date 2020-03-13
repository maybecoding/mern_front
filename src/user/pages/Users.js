import React from 'react';

import UsersList from '../components/UsersList'

export default () => {
  const ITEMS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      placesCount: 3
    }
  ];
  
  return (
    <UsersList items={ITEMS} />
  )
}