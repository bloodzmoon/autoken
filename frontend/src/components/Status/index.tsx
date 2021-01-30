import styles from './Status.module.css'
import { cssModule } from '../../utils'
import { AiOutlineMeh } from 'react-icons/ai'

export function Status() {
  const css = cssModule(styles)
  return (
    <div className={css('wrapper') + ' shadow'}>
      <span className={css('text')}>
        <AiOutlineMeh className={css('icon-red')} />
        You are not logged in
      </span>
      <span className={css('bar no-auth')} />
    </div>
  )
}
