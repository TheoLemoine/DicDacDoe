import React from 'react'

import { useGame } from '../providers/gameProvider'
import { useGrid } from '../providers/gridProvider'

import { grid as gridActions, game as gameActions } from '../../actions/creators/index'

import Button from '../Button'

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
            <Button onClick={resetGame} label="Play again" />
        </div>
    )
}

export default WinnerPopup
