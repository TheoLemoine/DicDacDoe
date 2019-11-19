import React from 'react'
import { Canvas } from 'react-three-fiber'

import { GameContext } from './providers/gameProvider'
import { useGrid, GridContext } from './providers/gridProvider'
import { grid as gridActions } from '../actions/creators/index.ts'

/**
 * wrapper that allow to pass context over
 * to the three-fiber part of the VDOM
 */
function CanvasBridge({ children }) {
    const [_, gridDispatch] = useGrid()
    return (
        <GameContext.Consumer>
            {gameValue => (
                <GridContext.Consumer>
                    {gridValue => (
                        <Canvas
                            style={{ height: '100vh' }}
                            onPointerMissed={() => {
                                gridDispatch(gridActions.setSelectedPlane(null))
                                gridDispatch(gridActions.setHoveredPlane(null))
                                gridDispatch(gridActions.setHoveredCell(null))
                            }}
                        >
                            <GameContext.Provider value={gameValue}>
                                <GridContext.Provider value={gridValue}>
                                    {children}
                                </GridContext.Provider>
                            </GameContext.Provider>
                        </Canvas>
                    )}
                </GridContext.Consumer>
            )}
        </GameContext.Consumer>
    )
}

export default CanvasBridge
