import React from 'react'
import CanvasApp from './CanvasApp'
import UserInterface from './userInterface/index'

import { game } from '../actions/creators'
import { useGame } from './providers/gameProvider'
import { useGrid } from './providers/gridProvider'

function Content({ onMouseMove, onMessageChange }) {
    const [{ helpMessage }, gameDispatch] = useGame()
    const [{ selectedPlane }] = useGrid()

    const updateMousePos = e => {
        if (helpMessage !== null) {
            gameDispatch(game.setHelpMessage(null))
        }

        if (selectedPlane !== null && helpMessage === null) {
            onMessageChange('Cancel')
        } else {
            if (helpMessage === 'Void') {
                onMessageChange(null)
            } else {
                onMessageChange(helpMessage)
            }
        }

        onMouseMove({
            x: e.clientX,
            y: e.clientY,
        })
    }
    return (
        <div onMouseMoveCapture={updateMousePos}>
            <CanvasApp />
            <UserInterface />
        </div>
    )
}

export default Content
