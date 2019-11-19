import React, { useState } from 'react'

import '../styles/styles.sass'

import { GameProvider } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

import CanvasApp from './CanvasApp'
import UserInterface from './userInterface/index.jsx'
import Cursor from './userInterface/Cursor.jsx'

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
                </GridProvider>
                <UserInterface />
            </div>
            <Cursor {...mousePos} />
        </GameProvider>
    )
}

export default App
