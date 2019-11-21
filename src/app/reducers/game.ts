import { WINNER, PLAYERS, CURRENT_PLAYER, HELP_MESSAGE, TURN } from '../actions/types/index'

export type GameState<PlayerT> = {
    winner: PlayerT
    current_player: PlayerT
    players: Array<PlayerT>
    helpMessage: string
    turn: number
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

        case TURN.INCREMENT:
            return {
                ...state,
                turn: state.turn + 1,
            }

        case TURN.RESET:
            return {
                ...state,
                turn: 1,
            }

        default:
            return state
    }
}
