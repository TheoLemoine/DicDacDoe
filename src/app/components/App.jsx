import React from 'react'
import CanvasApp from './CanvasApp'
import HUD from './HUD/HUD'

import { GameProvider } from './providers/gameProvider'
import { GridProvider } from './providers/gridProvider'

function App() {
    return (
        <GameProvider>
            <HUD />
            <GridProvider>
                <CanvasApp />
            </GridProvider>
        </GameProvider>
    )
}

export default App
