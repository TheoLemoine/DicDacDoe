import React from 'react'
import { a } from 'react-spring/three'

function Circle({ position, opacity, scale }) {
    return (
        <a.mesh position={position} scale={scale}>
            <torusGeometry attach="geometry" args={[0.4, 0.02, 5, 20]} />
            <meshBasicMaterial
                attach="material"
                color={0x1166ff}
                transparent={true}
                opacity={opacity}
            />
        </a.mesh>
    )
}

export default Circle
