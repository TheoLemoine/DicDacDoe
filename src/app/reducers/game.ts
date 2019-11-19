import { WINNER, PLAYERS, CURRENT_PLAYER } from '../actions/types/index'

type GameState<T> = {
    winner: T
    current_player: T
    players: Array<T>
}

export default (state: GameState<any>, action: any) => {
    switch (action.type) {
        case WINNER.SET:
            return {
                ...state,
                winner: action.player,
            }

        case PLAYERS.SET:
            return {
                ...state,
                players: action.players,
            }

        case CURRENT_PLAYER.SET:
            return {
                ...state,
                current_player: action.player,
            }

        default:
            return state
    }
}
