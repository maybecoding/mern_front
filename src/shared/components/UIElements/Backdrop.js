import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

export default props => ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-portal')
)