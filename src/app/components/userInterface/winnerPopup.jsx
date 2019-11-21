import React from 'react'

import { useGame } from '../providers/gameProvider'
import { useGrid } from '../providers/gridProvider'

import { grid as gridActions, game as gameActions } from '../../actions/creators/index'

import Button from '../Button'
import { animated } from 'react-spring'

const WinnerPopup = ({ style, winner }) => {
    const [grid, dispatchToGrid] = useGrid()
    const [game, dispatchToGame] = useGame()

    const resetGame = () => {
        dispatchToGrid(gridActions.reset())
        dispatchToGame(gameActions.resetTurn())
        dispatchToGame(gameActions.setWinner(null))
    }

    return (
        <animated.div className="winner-popup" style={style}>
            <h1 className="winner-popup-title">Player {String(winner)} won</h1>
            <Button onClick={resetGame}>Play again</Button>
        </animated.div>
    )
}

export default WinnerPopup
