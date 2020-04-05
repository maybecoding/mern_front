import { useState, useCallback } from 'react'


export const useHttp = callback => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // const send = useCallback((url, callback, method, json) => {
  //   const fn = async (url, callback, method, json) => {

  //     setIsLoading(true)

  //     try {
  //       const response = await fetch(url, {
  //         method: method || 'GET',
  //         headers: (json || undefined) || { 'Content-Type': 'application/json' },
  //         body: (json || undefined) && JSON.stringify(json)
  //       })

  //       const responseData = await response.json()
  //       if (!response.ok) {
  //         throw new Error(responseData.message)
  //       }
  //       setIsLoading(false)
  //       callback(responseData)

  //     } catch (error) {
  //       setErrorMessage(error.message || 'Something went wrong, please try again')
  //       setIsLoading(false)
  //     }
  //   }
  //   fn(url, callback, method, json)

  // }, [setIsLoading, setErrorMessage])

  const send = useCallback( (url, method = 'GET', body, token) => new Promise( (resolve) => {
    
    setIsLoading(true)
    let responseIsOk, stage = 'initialization'

    const isJson = body && body.constructor.name === 'Object'
    let headers = (isJson || token) ? {} : undefined
    if (isJson) headers['Content-Type'] = 'application/json'
    if (token) headers['Authorization'] = `Bearer ${token}`
    headers = new Headers(headers)
    fetch(url, {
      method,
      headers,
      body: isJson ? JSON.stringify(body) : body
    }).then(response => {
      stage = 'parsing response'
      responseIsOk = response.ok
      return response.json()
    }).then(responseData => {
      if (!responseIsOk) {
        stage = 'validation'
        throw new Error(`An error ocurred during ${stage}: ${responseData.message}`)
      }
      setIsLoading(false)
      resolve(responseData)
    }).catch(error => {
      setErrorMessage(error.message || 'Something went wrong, please try again')
      setIsLoading(false)
    })
    // try {
    //   const response = await fetch(url, {
    //     method: method,
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(json)
    //   })

    //   const responseData = await response.json()

    //   if (!response.ok) {
    //     throw new Error(responseData.message)
    //   }
    //   setIsLoading(false)
    //   return resßßponseData

    // } catch (error) {
    //   setErrorMessage(error.message || 'Something went wrong, please try again')
    //   setIsLoading(false)
    // }
  }), [])


  const errorClear = () => setErrorMessage(null)

  return { send, isLoading, errorMessage, errorClear }
}
