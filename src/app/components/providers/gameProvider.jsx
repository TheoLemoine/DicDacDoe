import React, { useReducer, createContext, useContext } from 'react'
import game from '../../reducers/game.ts'

export const GameContext = createContext(null)

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(game, {
        winner: null,
        current_player: 1,
        players: [],
    })

    return (
        <GameContext.Provider value={[state, dispatch]}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)
