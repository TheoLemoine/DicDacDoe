import React, { useCallback } from 'react'
import {} from 'prop-types'

import Button from '../Button'

import { useGame } from '../providers/gameProvider'
import { useGrid } from '../providers/gridProvider'
import { grid as gridActions, game as gameActions } from '../../actions/creators/index.ts'

import { nextPlayer } from '../../utils/gameUtils'
import { set } from '../../utils/array3D'
import { computeMove } from '../../utils/IA'

const MakeIAPlay = () => {
    const [{ current_player, players, winner }, dispatchToGame] = useGame()
    const [{ grid }, dispatchToGrid] = useGrid()

    const playAsIA = useCallback(() => {
        const move = computeMove(grid, current_player, players, 20)
        const newGrid = set(grid, move, current_player)

        dispatchToGrid(gridActions.set(newGrid))
        dispatchToGame(gameActions.updateWinner(newGrid, move, current_player))
        dispatchToGrid(gridActions.resetSelection())
        dispatchToGame(gameActions.setCurrentPlayer(nextPlayer(current_player, players)))
    }, [grid, current_player, players])

    return <Button onClick={playAsIA} label="Let the IA Play" />
}

export default MakeIAPlay
