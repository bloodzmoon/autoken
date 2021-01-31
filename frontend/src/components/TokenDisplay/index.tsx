import styles from './TokenDisplay.module.css'
import { cssModule } from '../../utils'
import { useAuth } from '../../contexts'

export function TokenDisplay() {
  const css = cssModule(styles)
  const auth = useAuth()

  const calAniTime = (exp?: number) => {
    if (!exp) return '0'
    const diff = exp * 1000 - new Date().getTime()
    return `${diff / 1000}s`
  }

  const calAniWidth = (lifetime: number, exp?: number) => {
    if (!exp) return '0'
    const diff = (exp * 1000 - new Date().getTime()) / 1000
    return `${(100 * diff) / lifetime}%`
  }

  return (
    <div className={css('wrapper')}>
      <div className={css('token')}>
        <span className={css('text')}>Access Token</span>
        <span
          className={css('lifetime timer')}
          style={{
            animationDuration: calAniTime(auth.accessToken?.exp),
            width: calAniWidth(15, auth.accessToken?.exp),
          }}
        />
      </div>
      <div className={css('token')}>
        <span className={css('text')}>Refresh Token</span>
        <span
          className={css('lifetime timer')}
          style={{
            animationDuration: calAniTime(auth.refreshToken?.exp),
            width: calAniWidth(60, auth.refreshToken?.exp),
          }}
        />
      </div>
    </div>
  )
}
