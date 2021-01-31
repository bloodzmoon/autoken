import { createContext, useContext, useEffect, useState } from 'react'

type Status = 'no-auth' | 'loading' | 'auth'
type Token = { token: string; exp: number }

type Auth = {
  status: Status
  accessToken: Token | null
  refreshToken: Token | null
  setStatus: React.Dispatch<React.SetStateAction<Status>>
  setAccessToken: React.Dispatch<React.SetStateAction<Token | null>>
  setRefreshToken: React.Dispatch<React.SetStateAction<Token | null>>
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
  const [accessToken, setAccessToken] = useState<Token | null>(null)
  const [refreshToken, setRefreshToken] = useState<Token | null>(null)

  useEffect(() => {
    const aToken = localStorage.getItem('accessToken')
    const rToken = localStorage.getItem('refreshToken')
    if (aToken) setAccessToken(JSON.parse(aToken))
    if (rToken) setRefreshToken(JSON.parse(rToken))
  }, [])

  useEffect(() => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
  }, [accessToken, refreshToken])

  useEffect(() => {
    if (!refreshToken) setStatus('no-auth')
    else setStatus('auth')
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
  }, [refreshToken])

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
