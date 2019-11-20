import React from 'react'
import Cylinder from './Cylinder'
import { a } from 'react-spring/three'

function Cross({ position, opacity, scale }) {
    return (
        <a.object3D position={position} scale={scale}>
            <Cylinder opacity={opacity} rotation={[0, 0, Math.PI / 4]} />
            <Cylinder opacity={opacity} rotation={[0, 0, -Math.PI / 4]} />
        </a.object3D>
    )
}

export default Cross
