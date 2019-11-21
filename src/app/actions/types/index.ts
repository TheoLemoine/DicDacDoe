export const GRID = {
    SET: 'app/grid/ADD',
    RESET: 'app/grid/RESET',
    SET_HOVERED_CELL: 'app/grid/SET_HOVERED_CELL',
    SET_HOVERED_PLANE: 'app/grid/SET_HOVERED_PLANE',
    SET_SELECTED_PLANE: 'app/grid/SET_SELECTED_PLANE',
    RESET_SELECTION: 'app/grid/RESET_SELECTION',
}

export const PLAYERS = {
    SET: 'app/player/SET',
}

export const WINNER = {
    SET: 'app/winner/SET',
}

export const CURRENT_PLAYER = {
    SET: 'app/current_player/SET',
}

export const HELP_MESSAGE = {
    SET: 'app/help_message/SET',
}

export const TURN = {
    INCREMENT: 'app/turn/INCREMENT',
    RESET: 'app/turn/RESET',
}

export default {
    GRID,
    GAME: {
        PLAYERS,
        CURRENT_PLAYER,
        WINNER,
        HELP_MESSAGE,
        TURN,
    },
}
