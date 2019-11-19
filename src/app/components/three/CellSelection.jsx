import React from 'react'

function CellSelection({ position, onClick, onPointerMove, opacity }) {
    return (
        <mesh position={position} onPointerMove={onPointerMove} onClick={onClick}>
            <boxBufferGeometry attach="geometry" args={[0.9999, 0.9999, 0.9999]} />
            <meshBasicMaterial attach="material" color={0xffffff} visible={false} />
        </mesh>
    )
}

export default CellSelection
