import { WINNER, PLAYERS, CURRENT_PLAYER, HELP_MESSAGE } from '../actions/types/index'

export type GameState<PlayerT> = {
    winner: PlayerT
    current_player: PlayerT
    players: Array<PlayerT>
    helpMessage: string
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

        case HELP_MESSAGE.SET:
            return {
                ...state,
                helpMessage: action.message,
            }

        default:
            return state
    }
}
