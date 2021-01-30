import { useState } from 'react'
import { AiOutlineLock, AiOutlineUser, AiOutlineSafety } from 'react-icons/ai'
import { Button, Form, Input, Spacer, Status } from '../../components'
import { cssModule } from '../../utils'
import styles from './HomePage.module.css'

export function HomePage() {
  const css = cssModule(styles)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!username || !password) {
      setError(true)
      setTimeout(() => setError(false), 200)
    } else {
      setLoading(true)
    }
  }

  return (
    <div className={css('page')}>
      <Status></Status>
      <Spacer />
      <Form onSubmit={handleSubmit} error={error}>
        <h1 className={css('head')}>
          <AiOutlineSafety />
          Autoken
        </h1>
        <Spacer />
        <Input
          type="username"
          placeholder="Username"
          Icon={AiOutlineUser}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error && !username}
          disabled={loading}
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
          disabled={loading}
          autoComplete="off"
          autoCorrect="no"
        />
        <Spacer />
        <Button disabled={loading}>Login</Button>
      </Form>
    </div>
  )
}
