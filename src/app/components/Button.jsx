import React from 'react'
import { func, string } from 'prop-types'

import './Button.sass'

const Button = ({ onClick = () => {}, label = '' }) => (
    <button onClick={onClick} className="app-button">
        {label}
    </button>
)

Button.propTypes = {
    onCLick: func,
    label: string,
}

export default Button
