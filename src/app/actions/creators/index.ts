import { GRID, PLAYERS, CURRENT_PLAYER, WINNER, HELP_MESSAGE } from '../types'
import { Array3D } from '../../utils/array3D'
import { Coords } from '../../utils/coords'
import { checkWin } from '../../utils/gameUtils'

export const grid = {
    set(grid: Array3D) {
        return {
            type: GRID.SET,
            grid,
        }
    },
    reset() {
        return {
            type: GRID.RESET,
        }
    },
    setHoveredPlane(plane: number) {
        return {
            type: GRID.SET_HOVERED_PLANE,
            plane,
        }
    },
    setHoveredCell(cell: Coords) {
        return {
            type: GRID.SET_HOVERED_CELL,
            cell,
        }
    },
    setSelectedPlane(plane: number) {
        return {
            type: GRID.SET_SELECTED_PLANE,
            plane,
        }
    },
    resetSelection() {
        return {
            type: GRID.RESET_SELECTION,
        }
    },
}

export const game = {
    setPlayers(players: Array<any>) {
        return {
            type: PLAYERS.SET,
            players,
        }
    },
    setCurrentPlayer(player: any) {
        return {
            type: CURRENT_PLAYER.SET,
            player,
        }
    },
    setWinner(player: any) {
        return {
            type: WINNER.SET,
            player,
        }
    },
    setHelpMessage(message: string) {
        return {
            type: HELP_MESSAGE.SET,
            message,
        }
    },
    updateWinner(gameState: Array3D, lastMove: Coords, current_player: any) {
        return this.setWinner(checkWin(gameState, lastMove) ? current_player : null)
    },
}

export default {
    grid,
    game,
}
