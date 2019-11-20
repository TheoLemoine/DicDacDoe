import React from 'react'
import { func, string, bool } from 'prop-types'

import './Button.sass'

const Button = ({ onClick = () => {}, label = '', active = true }) => (
    <button onClick={active ? onClick : null} className={`app-button ${active || 'disabled'}`}>
        {label}
    </button>
)

Button.propTypes = {
    onCLick: func,
    label: string,
    disabled: bool,
}

export default Button
