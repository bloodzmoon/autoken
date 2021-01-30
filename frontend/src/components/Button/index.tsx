import { cssModule } from '../../utils'
import styles from './Button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: Props) {
  const css = cssModule(styles)

  return (
    <button className={css('btn')} {...props}>
      {children}
    </button>
  )
}
