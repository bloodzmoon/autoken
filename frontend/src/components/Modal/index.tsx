import ReactDOM from 'react-dom'
import { useState } from 'react'
import { cssModule } from '../../utils'
import styles from './Modal.module.css'

type Props = {
  children: React.ReactNode
  modal: ReturnType<typeof Modal.useModal>
}

/**
 * Modal Component MUST use with `useModal` hook to control their state.
 *
 * Modal component split into 4 parts. The first one is `Modal`
 * and this component must wrap around other components. The 3 remaining
 * components are `Modal.Header`, `Modal.Body`, and `Modal.Footer`.
 */
export function Modal({ children, modal }: Props) {
  const css = cssModule(styles)

  return (
    <>
      {modal.isActive &&
        ReactDOM.createPortal(
          <div
            className={css('overlay')}
            onClick={(e) => {
              if (e.target === e.currentTarget) modal.close()
            }}
          >
            <div
              className={
                css('wrapper', modal.willClose ? 'close' : '') + ' shadow'
              }
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

/**
 * Custom hook to use with `Modal component`.
 * Pass the return value into the Modal component prop
 * name `modal` then you can use that `modal` object to
 * control the Modal. For example you can use open(), close()
 */
Modal.useModal = () => {
  const [isActive, setIsActive] = useState(false)
  const [willClose, setWillClose] = useState(false)
  const open = () => setIsActive(true)
  const close = () => {
    setWillClose(true)
    setTimeout(() => {
      setIsActive(false)
      setWillClose(false)
    }, 100)
  }
  return { isActive, open, close, willClose }
}
