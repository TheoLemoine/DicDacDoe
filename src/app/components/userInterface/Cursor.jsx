import React from 'react'
import { createPortal } from 'react-dom'

const Cursor = props => {
    const { x, y } = props

    const positionStyles = {
        left: x,
        top: y,
    }

    return createPortal(
        <div className="hud-cursor" style={positionStyles}></div>,
        document.getElementById('root')
    )
}

export default Cursor
