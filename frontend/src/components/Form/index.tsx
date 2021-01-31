import styles from './Form.module.css'
import { cssModule } from '../../utils'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: () => void
  error?: boolean
  short?: boolean
}

export function Form({
  onSubmit = () => {},
  error,
  children,
  short,
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
      className={
        css('wrapper', error ? 'err' : '', short ? 'short' : '') + ' shadow '
      }
      {...props}
    >
      {children}
    </form>
  )
}
