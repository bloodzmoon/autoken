import { createContext, useContext, useEffect, useState } from 'react'

type Status = 'no-auth' | 'loading' | 'auth'

type Auth = {
  status: Status
  accessToken: string | null
  refreshToken: string | null
  setStatus: React.Dispatch<React.SetStateAction<Status>>
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>
}

type Props = { children: React.ReactNode }

const AuthContext = createContext<Auth>({
  status: 'no-auth',
  accessToken: null,
  refreshToken: null,
  setStatus: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
})

export function AuthProvider({ children }: Props) {
  const [status, setStatus] = useState<Status>('loading')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  useEffect(() => {
    const aToken = localStorage.getItem('accessToken')
    const rToken = localStorage.getItem('refreshToken')
    if (aToken) setAccessToken(JSON.parse(aToken))
    if (rToken) setRefreshToken(JSON.parse(rToken))
  }, [])

  useEffect(() => {
    if (!accessToken) setStatus('no-auth')
    else setStatus('auth')
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
  }, [accessToken, refreshToken])

  return (
    <AuthContext.Provider
      value={{
        status,
        accessToken,
        refreshToken,
        setStatus,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
