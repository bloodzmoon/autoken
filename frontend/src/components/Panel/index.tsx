import styles from './Panel.module.css'
import { useState } from 'react'
import { FcCursor, FcExpired } from 'react-icons/fc'
import { FiExternalLink } from 'react-icons/fi'
import { cssModule, getProfile, logout, renewToken } from '../../utils'
import { useAuth } from '../../contexts'
import { Button } from '../Button'
import { Spacer } from '../Spacer'
import { Modal } from '../Modal'

export function Panel() {
  const css = cssModule(styles)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const modal = Modal.useModal()
  const auth = useAuth()

  const getData = async () => {
    setData(null)
    modal.open()
    const [err, profile] = await getProfile()
    if (err) {
      const aExpired = auth.accessToken!.exp * 1000 < new Date().getTime()
      const rExpired = auth.refreshToken!.exp * 1000 < new Date().getTime()
      if (aExpired) setError('A')
      if (rExpired) setError('R')
      console.log(err)
    }

    setData(profile)
  }

  const handleRenew = async () => {
    auth.setStatus('loading')
    const [error, data] = await renewToken()
    if (error) {
      console.log(error)
      auth.setStatus('no-auth')
      localStorage.removeItem('refreshToken')
      return
    }
    auth.setStatus('auth')
    auth.setAccessToken(data.accessToken)
    modal.close()
  }

  const handleLogout = async () => {
    auth.setStatus('loading')
    await logout()
    auth.setAccessToken(null)
    auth.setRefreshToken(null)
  }

  return (
    <div className={css('wrapper')}>
      <Button type="button" onClick={getData}>
        Show Profile
      </Button>
      <Spacer y={0.5} />
      <Button alt>Logout</Button>

      <Modal modal={modal}>
        {data && (
          <>
            <FcCursor size={72} />
            <h1>Hi, I am Than</h1>
            <a
              href="https://github.com/bloodzmoon"
              target="_blank"
              rel="noreferrer"
            >
              <Button onClick={modal.close}>
                <FiExternalLink className={css('link')} />
                Github
              </Button>
            </a>
          </>
        )}
        {error === 'A' && (
          <>
            <FcExpired size={72} />
            <h2>Access token expired</h2>
            <Spacer />
            <Button onClick={handleRenew}>Renew</Button>
          </>
        )}
        {error === 'R' && (
          <>
            <FcExpired size={72} />
            <h2>Refresh token expired</h2>
            <Spacer />
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Modal>
    </div>
  )
}
