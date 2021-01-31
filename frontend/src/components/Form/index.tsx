import styles from './Form.module.css'
import { cssModule } from '../../utils'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  status: 'auth' | 'no-auth' | 'loading'
  onSubmit?: () => void
  error?: boolean
}

export function Form({
  onSubmit = () => {},
  error,
  children,
  status,
  ...props
}: Props) {
  const css = cssModule(styles)

  const handler = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handler}
      className={css('wrapper', error ? 'err' : '', status) + ' shadow '}
      {...props}
    >
      {children}
    </form>
  )
}
