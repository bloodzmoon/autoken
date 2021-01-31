import styles from './Panel.module.css'
import { cssModule } from '../../utils'
import { Button } from '../Button'
import { Spacer } from '../Spacer'

export function Panel() {
  const css = cssModule(styles)

  return (
    <div className={css('wrapper')}>
      <Button type="button">Show Profile</Button>
      <Spacer y={0.5} />
      <Button alt>Logout</Button>
    </div>
  )
}
