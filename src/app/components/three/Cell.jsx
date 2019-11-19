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

import * as Coords from '../../utils/coords'

function Cell({ position, player }) {
    const [game, gameDispatch] = useGame()
    const [gridState, gridDispatch] = useGrid()
    const { selectedPlane, hoveredPlane, hoveredCell } = gridState

    const [x, y, z] = position
    const positionObj = { x, y, z }

    const isEmpty = player === null
    const isSelectingCell = selectedPlane !== null
    const isSelectingPlane = selectedPlane === null
    const isInSelectedPlane = isSelectingCell && position[1] === selectedPlane
    const isInHoveredPlane =
        hoveredPlane !== null && position[1] === hoveredPlane
    const isCellHovered =
        hoveredCell !== null && Coords.equals(hoveredCell, positionObj)

    const onHoverMove = useCallback(
        e => {
            if (isSelectingPlane || isInSelectedPlane) e.stopPropagation()

            if (isSelectingPlane) {
                gridDispatch(gridActions.setHoveredPlane(position[1]))
            }

            if (isSelectingCell) {
                gridDispatch(gridActions.setHoveredCell(positionObj))
            }
        },
        [gridState, position]
    )

    const onClick = useCallback(
        e => {
            if (isSelectingPlane || isInSelectedPlane) e.stopPropagation()

            if (isSelectingPlane) {
                gridDispatch(gridActions.setSelectedPlane(position[1]))
            }

            if (isSelectingCell && isEmpty) {
                const [x, y, z] = position.map(c => c + 1)
                gridDispatch(gridActions.add({ x, y, z }, game.current_player))
                gridDispatch(gridActions.resetSelection())
                gameDispatch(
                    gameActions.setCurrentPlayer(
                        game.current_player == 1 ? 2 : 1
                    )
                )
            }
        },
        [gridState, player, position]
    )

    const getEdgesOpacity = useCallback(() => {
        if (isSelectingPlane) return 0.7
        if (isSelectingCell && isInSelectedPlane) return 1
        if (isSelectingCell && !isInSelectedPlane) return 0.1
    }, [position, gridState])

    const getSelectionOpacity = useCallback(() => {
        if (isSelectingPlane && isInHoveredPlane) return 0.3
        if (isSelectingPlane && !isInHoveredPlane) return 0
        if (isSelectingCell && isCellHovered) return 0.3
        if (isSelectingCell && !isCellHovered) return 0
    }, [position, gridState])

    return (
        <>
            <CellSelection
                position={position}
                opacity={getSelectionOpacity()}
                onPointerMove={onHoverMove}
                onClick={onClick}
            />
            <CellEdges position={position} opacity={getEdgesOpacity()} />
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
