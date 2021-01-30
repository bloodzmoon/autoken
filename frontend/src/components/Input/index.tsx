import styles from './Input.module.css'
import { cssModule } from '../../utils'
import { IconType } from 'react-icons'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType
}

export function Input({ Icon, ...props }: Props) {
  const css = cssModule(styles)

  return (
    <span className={css('wrapper')}>
      {Icon && <Icon className={css('icon')} />}
      <input className={css('input', Icon ? 'indent' : '')} {...props} />
    </span>
  )
}
