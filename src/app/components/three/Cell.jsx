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

function Cell({
    position,
    player,
    onHoverMove,
    focus,
    onClick,
    visible,
    stopPropagation,
}) {
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
        if (stopPropagation) e.stopPropagation()
        const { x, y, z } = e.point
        const point = new Vector3(x, y, z)
        const direction = getDirection(point.clone())
        onHoverMove([x, y, z], direction, position)
    }

    const click = e => {
        if (stopPropagation) {
            e.stopPropagation()
            onClick(player, position)
        }
    }

    const getOpacity = () => {
        if (!visible) {
            return 0.2
        }
        if (focus) {
            return 1
        }
        return 0.7
    }

    const getColor = () => {
        switch (player) {
            case 1:
                return 'red'
            case 2:
                return 'blue'
            default:
                return 'white'
        }
    }

    return (
        <mesh position={position} onPointerMove={move} onClick={click}>
            <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]} />
            <meshPhongMaterial
                attach="material"
                color={getColor()}
                transparent={true}
                opacity={getOpacity()}
            />
        </mesh>
    )
}

export default Cell
