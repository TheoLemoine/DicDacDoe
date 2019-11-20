import React from 'react'
import { createPortal } from 'react-dom'
import useContainer from '../../utils/hooks/useContainer'
import './cursor.sass'

const cursorRoot = document.getElementById('cursor-root')

const Cursor = ({ x, y }) => {
    const container = useContainer(cursorRoot)

    return createPortal(
        <div className="cursor cursor-main" style={{ left: x, top: y }}></div>,
        container.current
    )
}

export default Cursor
