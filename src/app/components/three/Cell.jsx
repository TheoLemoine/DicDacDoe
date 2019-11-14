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

function Cell({ position, onHoverMove, focus, onClick }) {
    const getAxisAngle = (axis, target) => {
        const angle = axis.vector.angleTo(target) % Math.PI
        if (angle > Math.PI / 2) return Math.abs(angle - Math.PI)
        return angle
    }

    const getDirection = hoverPoint => {
        const start = new Vector3(...position)
        hoverPoint.sub(start)
        return AXES.reduce((acc, cur) => {
            if (acc == null) return cur
            return getAxisAngle(cur, hoverPoint) < getAxisAngle(acc, hoverPoint)
                ? cur
                : acc
        }, null).axis
    }

    const move = e => {
        const { x, y, z } = e.point
        e.stopPropagation()
        const point = new Vector3(x, y, z)
        const direction = getDirection(point.clone())
        onHoverMove([x, y, z], direction, position)
    }

    return (
        <mesh position={position} onPointerMove={move} onClick={onClick}>
            <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]} />
            {focus ? (
                <meshNormalMaterial attach="material" />
            ) : (
                <meshBasicMaterial attach="material" color={'white'} />
            )}
        </mesh>
    )
}

export default Cell
