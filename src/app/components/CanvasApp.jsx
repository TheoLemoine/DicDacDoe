import React, { useState, useContext, useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
import {
    grid as gridActions,
    game as gameActions,
} from '../actions/creators/index.ts'

import GridContext from './providers/gridProvider'
import GameContext from './providers/gameProvider'
import Cube from './three/Cube.jsx'
import CameraControls from './three/CameraControls.jsx'
import { Vector3 } from 'three'

function CanvasApp() {
    const [hoverPosition, setHoverPosition] = useState([0, 0, 0])
    const [focusArea, setFocusArea] = useState([null, null, null])
    const [selectedPlane, setSelectedPlane] = useState(null)
    const [isVertical, setIsVertical] = useState(false)
    const [grid, gridDispatch] = useContext(GridContext)
    const [game, gameDispatch] = useContext(GameContext)

    const processFocusArea = useCallback(
        (direction, cubePosition) => {
            if ((direction == 'x' || direction == 'z') && !isVertical) {
                return [null, cubePosition[1], null]
            }
            if (direction == 'x' && isVertical) {
                return [null, null, cubePosition[2]]
            }
            if (direction == 'z' && isVertical) {
                return [cubePosition[0], null, null]
            }
            if (direction == 'y') {
                return [null, cubePosition[1], null]
            }
        },
        [isVertical]
    )

    const onHoverMove = useCallback(
        (point, direction, cubePosition) => {
            if (selectedPlane == null) {
                setFocusArea(processFocusArea(direction, cubePosition))
            } else {
                setFocusArea([...cubePosition])
            }
            setHoverPosition(point)
        },
        [selectedPlane, processFocusArea]
    )

    const onClick = useCallback(
        cellPlayer => {
            if (selectedPlane == null) {
                const axes = ['x', 'y', 'z']
                setSelectedPlane(
                    focusArea.reduce((acc, cur, i) =>
                        acc != null || cur == null
                            ? acc
                            : { axis: axes[i], value: cur }
                    )
                )
                setFocusArea([null, null, null])
            } else if (cellPlayer == null) {
                const [x, y, z] = focusArea.map(c => c + 1)

                gridDispatch(
                    gridActions.add(new Vector3(x, y, z), game.current_player)
                )
                gameDispatch(
                    gameActions.setCurrentPlayer(
                        game.current_player == 1 ? 2 : 1
                    )
                )

                setSelectedPlane(null)
                setFocusArea([null, null, null])
            }
        },
        [selectedPlane, focusArea]
    )

    return (
        <Canvas
            style={{ height: '100vh' }}
            onMouseDown={e => {
                if (e.button == 2) {
                    setIsVertical(!isVertical)
                }
            }}
            onPointerMissed={() => {
                setSelectedPlane(null)
                setFocusArea([null, null, null])
            }}
        >
            <Cube
                hoverPosition={hoverPosition}
                focusArea={focusArea}
                selectedPlane={selectedPlane}
                onHoverMove={onHoverMove}
                onClick={onClick}
                grid={grid}
            />
            <ambientLight intensity={0.3} color={0xffffff} />
            <directionalLight
                intensity={1}
                color={0xffffff}
                position={new Vector3(10, 10, 8)}
            />
            <CameraControls />
        </Canvas>
    )
}
export default CanvasApp
