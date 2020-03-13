import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './Modal.css'

import Backdrop from './Backdrop'



const ModalOverlay = props => {
  const content = (
    <div
      className={`modal ${props.className || ''}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClassName || ''}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClassName || ''}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClassName || ''}`}>
          {props.footer}
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