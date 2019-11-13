import React, { useState } from 'react'
import { useThree } from 'react-three-fiber'
import { Color } from 'three'
import Box from './Box.jsx'

function Scene() {
    const { scene } = useThree()
    scene.background = new Color('black')

    const [hoverPosition, setHoverPosition] = useState([0, 0, 0])

    return (
        <>
            <mesh position={hoverPosition}>
                <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
                <meshNormalMaterial attach="material" />
            </mesh>

            {new Array(27).fill(0).map((_, index) => {
                const x = (index % 3) - 1
                const y = 1 - (Math.floor(index / 3) % 3)
                const z = Math.floor(index / 9) - 1
                return (
                    <Box
                        position={[x, y, z]}
                        key={index}
                        onHoverMove={setHoverPosition}
                    ></Box>
                )
            })}
        </>
    )
}

export default Scene
