import React from 'react'

function Cylinder({ rotation, opacity }) {
    return (
        <mesh rotation={rotation}>
            <cylinderGeometry attach="geometry" args={[0.02, 0.02, 0.8, 15, 1]} />
            <meshBasicMaterial
                attach="material"
                color={0xcc3c00}
                transparent={true}
                opacity={opacity}
            />
        </mesh>
    )
}

export default Cylinder
