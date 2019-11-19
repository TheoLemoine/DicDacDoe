import React, { useContext } from 'react'

import { useGame } from '../providers/gameProvider'
import { useGrid } from '../providers/gridProvider'

import {
    grid as gridActions,
    game as gameActions,
} from '../../actions/creators/index'

const WinnerPopup = () => {
    const [grid, dispatchToGrid] = useGrid()
    const [game, dispatchToGame] = useGame()

    const { winner } = game

    const resetGame = () => {
        dispatchToGrid(gridActions.reset())
        dispatchToGame(gameActions.setWinner(null))
    }

    return (
        <div className="winner-popup">
            <h1>player {String(winner)} won</h1>
            <button onClick={resetGame}>Play again</button>
        </div>
    )
}

export default WinnerPopup
