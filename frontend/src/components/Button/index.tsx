import { cssModule } from '../../utils'
import styles from './Button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  alt?: boolean
}

export function Button({ children, alt, ...props }: Props) {
  const css = cssModule(styles)

  return (
    <button className={css('btn', alt ? 'red' : '')} {...props}>
      {children}
    </button>
  )
}
