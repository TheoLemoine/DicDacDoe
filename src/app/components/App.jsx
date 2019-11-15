import React from 'react'
import CanvasApp from './CanvasApp'

import { GameProvider } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

function App() {
    return (
        <GameProvider>
            <GridProvider>
                <CanvasApp />
            </GridProvider>
        </GameProvider>
    )
}

export default App
