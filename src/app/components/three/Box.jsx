import React from 'react'
import { Vector3 } from 'three'

const AXES = [
    {
        axis: 'x',
        vector: new Vector3(1, 0, 0),
    },
    {
        axis: 'y',
        vector: new Vector3(0, 1, 0),
    },
    {
        axis: 'z',
        vector: new Vector3(0, 0, 1),
    },
]

function Box(props) {
    const getAxisAngle = (axis, target) => {
        const angle = axis.vector.angleTo(target) % Math.PI
        if (angle > Math.PI / 2) return Math.abs(angle - Math.PI)
        return angle
    }

    const move = e => {
        const { x, y, z } = e.point
        e.stopPropagation()
        props.onHoverMove([x, y, z])
        const target = new Vector3(x, y, z)
        const start = new Vector3(...props.position)
        target.sub(start)
        const direction = AXES.reduce((acc, cur) => {
            if (acc == null) return cur
            return getAxisAngle(cur, target) < getAxisAngle(acc, target)
                ? cur
                : acc
        }, null)
        console.log(direction)
    }

    return (
        <mesh position={props.position} onPointerMove={move}>
            <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

export default Box
