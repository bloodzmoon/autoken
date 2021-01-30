import styles from './Form.module.css'
import { cssModule } from '../../utils'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: () => void
}

export function Form({ children, onSubmit = () => {}, ...props }: Props) {
  const css = cssModule(styles)

  const handler = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handler} className={css('wrapper') + ' shadow'} {...props}>
      {children}
    </form>
  )
}
