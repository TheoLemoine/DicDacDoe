import React from 'react'
import { DoubleSide } from 'three'

function CellSelection({ position, onClick, onPointerMove, opacity }) {
    return (
        <mesh
            position={position}
            onPointerMove={onPointerMove}
            onClick={onClick}
        >
            <boxBufferGeometry
                attach="geometry"
                args={[0.9999, 0.9999, 0.9999]}
            />
            <meshBasicMaterial
                attach="material"
                color={0xffffff}
                transparent={true}
                opacity={opacity}
                side={DoubleSide}
            />
        </mesh>
    )
}

export default CellSelection
