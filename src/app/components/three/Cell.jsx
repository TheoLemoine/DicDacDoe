import React, { useState, useEffect, useCallback } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3, BoxGeometry } from 'three'

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

const getAxisAngle = (axis, target) => {
    const angle = axis.vector.angleTo(target) % Math.PI
    if (angle > Math.PI / 2) return Math.abs(angle - Math.PI)
    return angle
}

function Cell({
    position,
    player,
    onHoverMove,
    focus,
    onClick,
    visible,
    stopPropagation,
}) {
    const [borderModel, setBorderModel] = useState(null)
    const [crossModel, setCrossModel] = useState(null)
    const [circleModel, setCircleModel] = useState(null)

    useEffect(() => {
        const loader = new GLTFLoader()
        loader.load('../../../assets/cube.gltf', setBorderModel)
        loader.load('../../../assets/cross.gltf', setCrossModel)
        loader.load('../../../assets/circle.gltf', setCircleModel)
    }, [])

    const getDirection = useCallback(
        hoverPoint => {
            const start = new Vector3(...position)
            hoverPoint.sub(start)
            return AXES.reduce((acc, cur) => {
                if (acc == null) return cur
                return getAxisAngle(cur, hoverPoint) <
                    getAxisAngle(acc, hoverPoint)
                    ? cur
                    : acc
            }, null).axis
        },
        [position]
    )

    const move = useCallback(
        e => {
            if (stopPropagation) e.stopPropagation()
            const { x, y, z } = e.point
            const point = new Vector3(x, y, z)
            const direction = getDirection(point.clone())
            onHoverMove([x, y, z], direction, position)
        },
        [stopPropagation, position, onHoverMove, getDirection]
    )

    const click = useCallback(
        e => {
            if (stopPropagation) {
                e.stopPropagation()
                onClick(player, position)
            }
        },
        [stopPropagation, player, position, onClick]
    )

    const getOpacity = useCallback(() => {
        if (!visible) {
            return 0.1
        }
        if (focus) {
            return 0.3
        }
        return 0.2
    }, [visible, focus])

    const getColor = useCallback(() => {
        switch (player) {
            case 1:
                return 'red'
            case 2:
                return 'blue'
            default:
                return 'white'
        }
    }, [player])

    return (
        <mesh position={position} onPointerMove={move} onClick={click}>
            <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]} />
            <meshPhongMaterial
                attach="material"
                color={getColor()}
                transparent={true}
                opacity={getOpacity()}
            />
            {crossModel != null && player == 1 && (
                <primitive
                    scale={[0.5, 0.5, 0.5]}
                    position={[0, 0, 0]}
                    object={crossModel.scene}
                />
            )}
            {circleModel != null && player == 2 && (
                <primitive
                    scale={[0.5, 0.5, 0.5]}
                    position={[0, 0, 0]}
                    object={circleModel.scene}
                />
            )}
        </mesh>
    )
}

export default Cell
