import React from 'react'
import { useSpring } from 'react-spring/three'
import BoxEdges from './BoxEdges'
function HoverCube({ hoveredPlane }) {
    const anim = useSpring({ position: [0, hoveredPlane, 0] })

    return <BoxEdges opacity={1} position={anim.position} size={[3, 1, 3]} />
}

export default HoverCube
