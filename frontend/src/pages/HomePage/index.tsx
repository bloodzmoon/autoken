import styles from './HomePage.module.css'
import { cssModule } from '../../utils'
import { Button, Form, Input, Spacer, Status } from '../../components'
import { AiOutlineLock, AiOutlineUser, AiOutlineSafety } from 'react-icons/ai'

export function HomePage() {
  const css = cssModule(styles)

  return (
    <div className={css('page')}>
      <Status></Status>
      <Spacer />
      <Form>
        <h1 className={css('head')}>
          <AiOutlineSafety />
          Autoken
        </h1>
        <Spacer />
        <Input Icon={AiOutlineUser} placeholder="Username" />
        <Spacer />
        <Input Icon={AiOutlineLock} placeholder="Password" type="password" />
        <Spacer />
        <Button>Login</Button>
      </Form>
    </div>
  )
}
