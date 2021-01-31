import { useState } from 'react'
import { AiOutlineLock, AiOutlineUser, AiOutlineSafety } from 'react-icons/ai'
import {
  Button,
  Form,
  Input,
  Spacer,
  Status,
  TokenDisplay,
} from '../../components'
import { useAuth } from '../../contexts'
import { cssModule, login, logout } from '../../utils'
import styles from './HomePage.module.css'

export function HomePage() {
  const css = cssModule(styles)
  const auth = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async () => {
    if (auth.status === 'no-auth') {
      if (!username || !password) {
        setError(true)
        setTimeout(() => setError(false), 200)
      } else {
        auth.setStatus('loading')
        const [err, data] = await login(username, password)
        if (err) {
          auth.setStatus('no-auth')
          setError(true)
          setTimeout(() => setError(false), 200)
        } else {
          auth.setStatus('auth')
          auth.setAccessToken(data.accessToken)
          auth.setAccessToken(data.accessToken)
        }
        setUsername('')
        setPassword('')
      }
    } else if (auth.status === 'auth') {
      auth.setStatus('loading')
      await logout()
      auth.setAccessToken(null)
      auth.setRefreshToken(null)
    }
  }

  return (
    <div className={css('page')}>
      <Status />
      <Spacer />
      <Form status={auth.status} onSubmit={handleSubmit} error={error}>
        <h1 className={css('head')}>
          <AiOutlineSafety />
          Autoken
        </h1>
        <Spacer />
        {auth.status === 'no-auth' && (
          <>
            <Input
              type="username"
              placeholder="Username"
              Icon={AiOutlineUser}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error && !username}
              autoComplete="off"
              autoCorrect="no"
            />
            <Spacer />
            <Input
              type="password"
              placeholder="Password"
              Icon={AiOutlineLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password}
              autoComplete="off"
              autoCorrect="no"
            />
          </>
        )}
        {auth.status === 'auth' && <TokenDisplay />}
        <Spacer />
        {auth.status !== 'loading' && (
          <Button>
            {auth.status === 'auth' && 'Logout'}
            {auth.status === 'no-auth' && 'Login'}
          </Button>
        )}
      </Form>
    </div>
  )
}
