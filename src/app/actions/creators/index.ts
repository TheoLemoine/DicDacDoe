import { GRID, PLAYERS, CURRENT_PLAYER, WINNER } from '../types'
import { Coords } from '../../utils/coords'

export const grid = {
    add(coords: Coords, value: any) {
        return {
            type: GRID.ADD,
            coords,
            value,
        }
    },
    reset() {
        return {
            type: GRID.RESET,
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
}

export default {
    grid,
    game,
}
