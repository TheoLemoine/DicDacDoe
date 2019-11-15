import React, { useState, useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import { grid as gridActions } from '../actions/creators/index.ts'

import GridContext from './providers/gridProvider'
import Cube from './three/Cube.jsx'
import CameraControls from './three/CameraControls.jsx'
import { Vector3 } from 'three'

function CanvasApp() {
    const [hoverPosition, setHoverPosition] = useState([0, 0, 0])
    const [focusArea, setFocusArea] = useState([null, null, null])
    const [selectedPlane, setSelectedPlane] = useState(null)
    const [isVertical, setIsVertical] = useState(false)
    const [grid, dispatch] = useContext(GridContext)

    const updateFocusAreaFromPlane = (direction, cubePosition) => {
        if ((direction == 'x' || direction == 'z') && !isVertical) {
            setFocusArea([null, cubePosition[1], null])
        }
        if (direction == 'x' && isVertical) {
            setFocusArea([null, null, cubePosition[2]])
        }
        if (direction == 'z' && isVertical) {
            setFocusArea([cubePosition[0], null, null])
        }
        if (direction == 'y' && isVertical) {
            setFocusArea([null, cubePosition[1], null])
        }
    }

    const onHoverMove = (point, direction, cubePosition) => {
        if (selectedPlane == null) {
            updateFocusAreaFromPlane(direction, cubePosition)
        } else {
            setFocusArea([...cubePosition])
        }
        setHoverPosition(point)
    }

    const onClick = player => {
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
        } else if (player == null) {
            const [x, y, z] = focusArea.map(c => c + 1)
            dispatch(gridActions.add(new Vector3(x, y, z), 1))
        }
    }

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
