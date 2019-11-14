import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'

import Cube from './three/Cube.jsx'
import Controls from './three/Controls.jsx'


function CanvasApp() {
    const [hoverPosition, setHoverPosition] = useState([0, 0, 0])
    const [focusArea, setFocusArea] = useState([null, null, null])
    const [selectedPlane, setSelectedPlane] = useState(null)
    const [isVertical, setIsVertical] = useState(false)

    console.log(selectedPlane)

    const onHoverMove = (point, direction, cubePosition) => {
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
        setHoverPosition(point)
    }

    const onClick = () => {
        if (selectedPlane == null) {
            const axes = ['x', 'y', 'z']
            setSelectedPlane(focusArea.reduce((acc, cur, i) => acc != null || cur == null ? acc : {axis: axes[i], value: cur}))   
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
        >
            <Cube
                hoverPosition={hoverPosition}
                focusArea={focusArea}
                selectedPlane={selectedPlane}
                onHoverMove={onHoverMove}
                onClick={onClick}
            />
            <Controls />
        </Canvas>
    )
}
export default CanvasApp
