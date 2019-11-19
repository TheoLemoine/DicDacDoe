import React, { useState, useEffect, useCallback } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3, BoxBufferGeometry, DoubleSide } from 'three'
import CellEdges from './CellEdges'
import CellSelection from './CellSelection'

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
            const direction = getDirection(point)
            onHoverMove(direction, position)
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
        if (player) {
            return 0.1
        }
        if (!visible) {
            return 0
        }
        if (focus) {
            return 0.1
        }
        return 0
    }, [visible, focus])

    const getModel = useCallback(() => {
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
        <>
            <CellSelection
                position={position}
                opacity={getOpacity()}
                onPointerMove={move}
                onClick={click}
            />
            <CellEdges position={position} opacity={visible ? 0.5 : 0.2} />
            {player == 1 && (
                <mesh position={position}>
                    <torusGeometry
                        attach="geometry"
                        args={[0.41, 0.04, 10, 15]}
                    />
                    <meshBasicMaterial
                        attach="material"
                        color={0x0000ff}
                        side={DoubleSide}
                    />
                </mesh>
            )}
            {player == 2 && (
                <mesh position={position}>
                    <cylinderGeometry
                        attach="geometry"
                        args={[0.04, 0.04, 0.8, 15, 1]}
                    />
                    <meshBasicMaterial
                        attach="material"
                        color={0xff0000}
                        side={DoubleSide}
                    />
                </mesh>
            )}
            {/* {crossModel != null && circleModel != null && (
                <primitive
                    scale={[0.5, 0.5, 0.5]}
                    position={[0, 0, 0]}
                    object={pcrossModel.scene}
                />
            )} */}
            {/* {circleModel != null && player == 2 && (
                <primitive
                    scale={[0.5, 0.5, 0.5]}
                    position={[0, 0, 0]}
                    object={circleModel.scene}
                />
            )} */}
        </>
    )
}

export default Cell
