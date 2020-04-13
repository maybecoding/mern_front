import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList'
import { useHttp } from '../../shared/hooks/http'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {

  const [loadedUsers, setLodedUsers] = useState()
  const { send, isLoading, errorMessage, errorClear } = useHttp()

  useEffect(() => {
    send(
      `${process.env.REACT_APP_BACKEND_URL}/users`
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