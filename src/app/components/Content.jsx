import React from 'react'
import CanvasApp from './CanvasApp'
import UserInterface from './userInterface/index'

import { game } from '../actions/creators'
import { useGame } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

function Content({ onMouseMove, onMessageChange }) {
    const [{ helpMessage }, gameDispatch] = useGame()

    const updateMousePos = e => {
        if (helpMessage !== null) {
            gameDispatch(game.setHelpMessage(null))
        }
        onMessageChange(helpMessage)

        onMouseMove({
            x: e.clientX,
            y: e.clientY,
        })
    }
    return (
        <div onMouseMoveCapture={updateMousePos}>
            <GridProvider>
                <CanvasApp />
                <UserInterface />
            </GridProvider>
        </div>
    )
}

export default Content
