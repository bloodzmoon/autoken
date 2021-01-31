import styles from './Status.module.css'
import { AiOutlineFrown, AiOutlineMeh, AiOutlineSmile } from 'react-icons/ai'
import { useAuth } from '../../contexts'
import { cssModule } from '../../utils'

export function Status() {
  const css = cssModule(styles)
  const auth = useAuth()

  const statusText = () => {
    switch (auth.status) {
      case 'no-auth':
        return 'You are not logged in'
      case 'loading':
        return 'Please wait . . .'
      case 'auth':
        return 'Welcome to Autoken!'
    }
  }

  const statusIcon = () => {
    switch (auth.status) {
      case 'no-auth':
        return <AiOutlineFrown className={css('icon red')} />
      case 'loading':
        return <AiOutlineMeh className={css('icon yellow')} />
      case 'auth':
        return <AiOutlineSmile className={css('icon green')} />
    }
  }

  return (
    <div className={css('wrapper') + ' shadow'}>
      <span className={css('text')}>
        {statusIcon()}
        {statusText()}
      </span>
      <span className={css('bar', auth.status)} />
    </div>
  )
}
