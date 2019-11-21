import React, { useCallback } from 'react'

import { grid as gridActions, game as gameActions } from '../../actions/creators/index.ts'
import { useGrid } from '../providers/gridProvider'
import { useGame } from '../providers/gameProvider'

import BoxEdges from './BoxEdges'
import CellSelection from './CellSelection'

import * as Coords from '../../utils/coords'
import { set } from '../../utils/array3D'
import { nextPlayer } from '../../utils/gameUtils'
import Circle from './Circle'
import Cross from './Cross'
import CellContent from './CellContent'

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
    const isInHoveredPlane = hoveredPlane !== null && position[1] === hoveredPlane
    const isCellHovered = hoveredCell !== null && Coords.equals(hoveredCell, positionObj)

    const onHoverMove = useCallback(
        e => {
            if (game.winner !== null) return
            if (isSelectingPlane || isInSelectedPlane) e.stopPropagation()

            if (isSelectingPlane) {
                gameDispatch(gameActions.setHelpMessage('Select'))
                gridDispatch(gridActions.setHoveredPlane(position[1]))
            }

            if (isSelectingCell) {
                if (isInSelectedPlane) {
                    if (isEmpty) {
                        gameDispatch(gameActions.setHelpMessage('Play'))
                        gridDispatch(gridActions.setHoveredCell(positionObj))
                    } else {
                        gameDispatch(gameActions.setHelpMessage('Disabled'))
                    }
                } else {
                    gameDispatch(gameActions.setHelpMessage('Void'))
                }
            }
        },
        [gridState, position]
    )

    const onClick = useCallback(
        e => {
            if (game.winner !== null) return
            if (isSelectingPlane || isInSelectedPlane) e.stopPropagation()

            if (isSelectingPlane) {
                gridDispatch(gridActions.setSelectedPlane(position[1]))
            }

            if (isSelectingCell && isInSelectedPlane && isEmpty) {
                const [x, y, z] = position.map(c => c + 1)
                const { current_player, players } = game
                const move = { x, y, z }
                const newGrid = set(gridState.grid, move, current_player)
                gridDispatch(gridActions.set(newGrid))
                gridDispatch(gridActions.resetSelection())
                gameDispatch(gameActions.updateWinner(newGrid, move, current_player))
                gameDispatch(gameActions.setCurrentPlayer(nextPlayer(current_player, players)))
                gameDispatch(gameActions.incrementTurn())
            }
        },
        [gridState, player, position]
    )

    const getEdgesOpacity = useCallback(() => {
        if (isSelectingPlane) return 0.1
        // if (isSelectingCell && isInSelectedPlane) return 1
        // if (isSelectingCell && !isInSelectedPlane) return 0.05
        if (isSelectingCell) return 0.05
    }, [position, gridState])

    // const getSelectionOpacity = useCallback(() => {
    //     if (isSelectingPlane && isInHoveredPlane) return 0.3
    //     if (isSelectingPlane && !isInHoveredPlane) return 0
    //     if (isSelectingCell && isCellHovered) return 0.3
    //     if (isSelectingCell && !isCellHovered) return 0
    // }, [position, gridState])

    const getContentOpacity = useCallback(() => {
        if (isSelectingCell && isInSelectedPlane && !isEmpty) return 1
        if (isSelectingCell && !isInSelectedPlane && !isEmpty) return 0.5
        if (isSelectingCell && isEmpty) return 0.5
        if (isSelectingPlane && isInHoveredPlane) return 1
        if (isSelectingPlane && !isInHoveredPlane) return 0.8
    }, [position, gridState])

    const getContentComponent = () => {
        if (player === 1 || (isCellHovered && game.current_player === 1)) {
            return Circle
        }
        if (player === 2 || (isCellHovered && game.current_player === 2)) {
            return Cross
        }
        return null
    }

    const ContentComponent = getContentComponent()

    return (
        <object3D position={position}>
            <CellSelection
                position={[0, 0, 0]}
                opacity={0}
                onPointerMove={onHoverMove}
                onClick={onClick}
            />
            <BoxEdges
                position={[0, 0, 0]}
                opacity={getEdgesOpacity()}
                size={[0.999, 0.999, 0.999]}
            />
            <CellContent ContentComponent={ContentComponent} opacity={getContentOpacity()} />
        </object3D>
    )
}

export default Cell
