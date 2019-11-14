import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'

import Cube from './three/Cube.jsx'
import Controls from './three/Controls.jsx'

function f(cb) {
    return () => {
        return cb
    }
}

function CanvasApp() {
    const [hoverPosition, setHoverPosition] = useState([0, 0, 0])
    const [focusCondition, setFocusCondition] = useState(
        f(function(arg) {
            return true
        })
    )
    const [selectCondition, setSelectCondition] = useState([null, null, null])
    const [isVertical, setIsVertical] = useState(false)

    const onHoverMove = (point, direction, cubePosition) => {
        if ((direction == 'x' || direction == 'z') && !isVertical) {
            setFocusCondition(f(([x, y, z]) => y == cubePosition[1]))
        }
        if (direction == 'x' && isVertical) {
            setFocusCondition(f(([x, y, z]) => z == cubePosition[2]))
        }
        if (direction == 'z' && isVertical) {
            setFocusCondition(f(([x, y, z]) => x == cubePosition[0]))
        }
        if (direction == 'y' && isVertical) {
            setFocusCondition(f(([x, y, z]) => y == cubePosition[1]))
        }
        setHoverPosition(point)
    }

    const onClick = console.log

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
                focusCondition={focusCondition}
                selectCondition={selectCondition}
                onHoverMove={onHoverMove}
                onClick={onClick}
            />
            <Controls />
        </Canvas>
    )
}
export default CanvasApp
