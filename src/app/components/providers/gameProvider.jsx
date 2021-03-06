import React, { useReducer, createContext, useContext } from 'react'
import game from '../../reducers/game.ts'

export const GameContext = createContext(null)

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(game, {
        winner: null,
        current_player: 1,
        players: [1, 2],
        helpMessage: null,
        turn: 1,
    })

    return <GameContext.Provider value={[state, dispatch]}>{children}</GameContext.Provider>
}

export const useGame = () => useContext(GameContext)
