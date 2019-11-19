import React, { useCallback } from 'react'
import { Vector3, DoubleSide } from 'three'

import {
    grid as gridActions,
    game as gameActions,
} from '../../actions/creators/index.ts'
import { useGrid } from '../providers/gridProvider'
import { useGame } from '../providers/gameProvider'

import CellEdges from './CellEdges'
import CellSelection from './CellSelection'

function Cell({ position, player }) {
    const [game, gameDispatch] = useGame()
    const [gridState, gridDispatch] = useGrid()
    const { selectedPlane, hoveredPlane, hoveredCell } = gridState

    const onHoverMove = useCallback(
        e => {
            if (selectedPlane === null || position[1] === selectedPlane)
                e.stopPropagation()

            if (selectedPlane === null) {
                gridDispatch(gridActions.setHoveredPlane(position[1]))
            } else {
                const [x, y, z] = position
                gridDispatch(gridActions.setHoveredCell({ x, y, z }))
            }
        },
        [gridState, position]
    )

    const onClick = useCallback(
        e => {
            if (selectedPlane === null || position[1] === selectedPlane)
                e.stopPropagation()

            if (selectedPlane === null) {
                gridDispatch(gridActions.setSelectedPlane(position[1]))
            } else if (player == null) {
                const [x, y, z] = focusArea.map(c => c + 1)
                gridDispatch(
                    gridActions.add(new Vector3(x, y, z), game.current_player)
                )
                gridDispatch(gridActions.setSelectedPlane(null))
                gameDispatch(
                    gameActions.setCurrentPlayer(
                        game.current_player == 1 ? 2 : 1
                    )
                )
            }
        },
        [player, position]
    )

    const getOpacity = useCallback(() => {
        if (
            player ||
            hoveredPlane === null ||
            position[1] === hoveredPlane ||
            (selectedPlane !== null && position[1] === selectedPlane)
        ) {
            return 0.5
        }
        return 0
    }, [player, hoveredPlane, position, selectedPlane])

    return (
        <>
            <CellSelection
                position={position}
                opacity={getOpacity()}
                onPointerMove={onHoverMove}
                onClick={onClick}
            />
            <CellEdges position={position} opacity={0.5} />
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
