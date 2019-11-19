import React from 'react'
import Cylinder from './Cylinder'

function Cross({ position, opacity }) {
    return (
        <object3D position={position}>
            <Cylinder opacity={opacity} rotation={[0, 0, Math.PI / 4]} />
            <Cylinder opacity={opacity} rotation={[0, 0, -Math.PI / 4]} />
        </object3D>
    )
}

export default Cross
