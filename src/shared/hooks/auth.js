const {useState, useEffect, useCallback } = require('react')


export const useAuth = () => {
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  const [tokenExpireDate, setTokenExpireDate] = useState()

  const login = useCallback(({userId: uid, token: t, tokenExpireDate: ted}) => {
    setUserId(uid)
    setToken(t)
    setTokenExpireDate(ted)
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: t, tokenExpireDate: ted.toISOString()}))
  }, [])

  useEffect(() => {
    const userDataText = localStorage.getItem('userData')
    if (!userDataText) return
    const { token, userId, tokenExpireDate:tedISO } = (JSON.parse(userDataText) || {})
    if (token && userId) {
      login({userId, token, tokenExpireDate: new Date(tedISO)})
    }
  }, [login])
  
  const logout = useCallback(() => {
    setUserId(undefined)
    setToken(undefined)
    setTokenExpireDate(undefined)
    localStorage.removeItem('userData')
  }, [])
  
  useEffect(() => {
    let timeout
    if (tokenExpireDate) timeout = setTimeout((logout), tokenExpireDate.getTime() - Date.now())
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [tokenExpireDate, logout])
  return { userId, token, login, logout }
}

