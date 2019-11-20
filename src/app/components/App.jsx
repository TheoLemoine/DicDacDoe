import React, { useState } from 'react'

import '../styles/styles.sass'

import { GameProvider } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

import CanvasApp from './CanvasApp'
import UserInterface from './userInterface/index'
import Cursor from './userInterface/cursor'
import CursorSmooth from './userInterface/cursorSmooth'

function App() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const updateMousePos = e => {
        setMousePos({
            x: e.clientX,
            y: e.clientY,
        })
    }

    return (
        <GameProvider>
            <div onMouseMoveCapture={updateMousePos}>
                <GridProvider>
                    <CanvasApp />
                    <UserInterface />
                </GridProvider>
            </div>
            <Cursor {...mousePos} />
            <CursorSmooth {...mousePos} />
        </GameProvider>
    )
}

export default App
