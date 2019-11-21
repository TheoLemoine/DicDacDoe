import React from 'react'
import { func, string, bool } from 'prop-types'

import './Button.sass'

const Button = ({ onClick = () => {}, active = true, children }) => (
    <button onClick={active ? onClick : null} className={`app-button ${active || 'disabled'}`}>
        {children}
    </button>
)

Button.propTypes = {
    onCLick: func,
    label: string,
    disabled: bool,
}

export default Button
