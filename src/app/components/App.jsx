import React, { useState } from 'react'
import '../styles/styles.sass'

import { GameProvider } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

import Cursor from './userInterface/cursor'
import CursorSmooth from './userInterface/CursorSmooth'
import Content from './Content'

function App() {
    const [mousePos, setMousePos] = useState({ x: -10, y: -10 })
    const [message, setMessage] = useState(null)
    return (
        <GameProvider>
            <GridProvider>
                <Content onMouseMove={setMousePos} onMessageChange={setMessage} />
                <Cursor {...mousePos} />
                <CursorSmooth {...mousePos} message={message} />
            </GridProvider>
        </GameProvider>
    )
}

export default App
