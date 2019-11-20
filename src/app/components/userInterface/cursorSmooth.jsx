import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import useContainer from '../../utils/hooks/useContainer'
import useInterval from '../../utils/hooks/useInterval'
import { useGame } from '../providers/gameProvider'
import './cursor.sass'

const cursorRoot = document.getElementById('cursor-root')

const Cursor = ({ x, y }) => {
    const [{ helpMessage }] = useGame()

    const [currentX, setCurrentX] = useState(innerWidth / 2)
    const [currentY, setCurrentY] = useState(innerHeight / 2)
    const targetX = useRef(0)
    const targetY = useRef(0)
    targetX.current = x
    targetY.current = y

    const smooth = (current, target, factor, offset) =>
        current + (target + offset - current) * factor

    useInterval(() => {
        setCurrentX(cx => smooth(cx, targetX.current, 0.3, -20))
        setCurrentY(cy => smooth(cy, targetY.current, 0.3, +20))
    }, 40)

    const container = useContainer(cursorRoot)

    return createPortal(
        <div
            className={`cursor ${helpMessage !== null && 'cursor-message'}`}
            style={{ right: innerWidth - currentX, top: currentY }}
        >
            {helpMessage}
        </div>,
        container.current
    )
}

export default Cursor
