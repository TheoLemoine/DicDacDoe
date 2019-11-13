import React from 'react'

function Box(props) {
    const move = e => {
        const { x, y, z } = e.point
        e.stopPropagation()
        props.onHoverMove([x, y, z])
    }

    return (
        <mesh position={props.position} onPointerMove={move}>
            <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

export default Box
