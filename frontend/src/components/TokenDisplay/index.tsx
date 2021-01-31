import styles from './TokenDisplay.module.css'
import { cssModule } from '../../utils'

export function TokenDisplay() {
  const css = cssModule(styles)

  return (
    <div className={css('wrapper')}>
      <div className={css('token')}>
        <span className={css('text')}>Access Token</span>
        <span className={css('lifetime timer')} />
      </div>
      <div className={css('token')}>
        <span className={css('text')}>Refresh Token</span>
        <span className={css('lifetime')} />
      </div>
    </div>
  )
}
