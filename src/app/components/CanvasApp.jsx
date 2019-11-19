import React from 'react'

import { useGrid } from './providers/gridProvider'

import { Vector3 } from 'three'
import CameraControls from './three/CameraControls.jsx'
import Cube from './three/Cube.jsx'
import CanvasBridge from './CanvasBridge'

function CanvasApp() {
    const [gridState] = useGrid()

    return (
        <CanvasBridge>
            <Cube grid={gridState.grid} />
            <ambientLight intensity={0.3} color={0xffffff} />
            <directionalLight
                intensity={1}
                color={0xffffff}
                position={new Vector3(10, 10, 8)}
            />
            <CameraControls />
        </CanvasBridge>
    )
}
export default CanvasApp
