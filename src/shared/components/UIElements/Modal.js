import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './Modal.css'

import Backdrop from './Backdrop'



const ModalOverlay = ({
  className,
  style,
  headerClassName,
  header,
  onSubmit,
  contentClassName,
  children,
  footerClassName,
  footer
}) => {
  const content = (
    <div
      className={`modal ${className || ''}`}
      style={style}
    >
      <header className={`modal__header ${headerClassName || ''}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClassName || ''}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClassName || ''}`}>
          {footer}
        </footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-portal'))
}
const Modal = props => (
  <React.Fragment>
    {props.isOpen && <Backdrop onClick={props.onCancel}/>}
    <CSSTransition
      in={props.isOpen}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames={'modal'}
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  </React.Fragment>
)

export default Modal