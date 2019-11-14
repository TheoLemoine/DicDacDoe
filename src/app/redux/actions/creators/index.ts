import { GRID, PLAYERS, CURRENT_PLAYER, WINNER } from '../types'
import Coords from '../../../utils/coords.type'
import IPlayer from '../../../utils/IPlayer.interface'

export const grid = {
    add(coords: Coords, value: IPlayer) {
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
    setPlayers(players: Array<IPlayer>) {
        return {
            type: PLAYERS.SET,
            players,
        }
    },
    setCurrentPlayer(player: IPlayer) {
        return {
            type: CURRENT_PLAYER.SET,
            player,
        }
    },
    setWinner(player: IPlayer) {
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
