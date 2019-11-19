import React from 'react'

function Circle({ position, opacity }) {
    return (
        <mesh position={position}>
            <torusGeometry attach="geometry" args={[0.4, 0.02, 5, 20]} />
            <meshBasicMaterial
                attach="material"
                color={0x0000ff}
                transparent={true}
                opacity={opacity}
            />
        </mesh>
    )
}

export default Circle
