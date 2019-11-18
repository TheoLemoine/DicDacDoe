import React, { useReducer, createContext } from 'react'
import game from '../../reducers/game.ts'

const GameContext = createContext(null)

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

export default GameContext
