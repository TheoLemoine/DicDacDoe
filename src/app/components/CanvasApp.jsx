import React from 'react'

import { Vector3 } from 'three'
import CameraControls from './three/CameraControls.jsx'
import Cube from './three/Cube.jsx'

import CanvasBridge from './CanvasBridge'

function CanvasApp() {
    return (
        <CanvasBridge>
            <Cube />
            <ambientLight intensity={0.3} color={0xffffff} />
            <directionalLight intensity={1} color={0xffffff} position={new Vector3(10, 10, 8)} />
            <CameraControls />
        </CanvasBridge>
    )
}
export default CanvasApp
