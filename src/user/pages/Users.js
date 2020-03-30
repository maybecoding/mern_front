import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList'
import { useHttp } from '../../shared/hooks/http'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  // const ITEMS = [
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     placesCount: 3
  //   },
  //   {
  //     id: 'u2',
  //     name: 'Max Schwarz',
  //     image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     placesCount: 30
  //   }
  // ];

  const [loadedUsers, setLodedUsers] = useState()
  const { send, isLoading, errorMessage, errorClear } = useHttp()

  useEffect(() => {
    send(
      'http://localhost:5000/api/users'
    ).then(response => {
      if (response) {
        setLodedUsers(response.users)
      }
    })
  }, [send])

  return <>
    <ErrorModal error={errorMessage} onCancel={errorClear} />
    {isLoading && <div className="center">
      <LoadingSpinner asOverlay/>
    </div>}
    {loadedUsers && !isLoading && <UsersList items={loadedUsers} />}
  </>
}

export default Users