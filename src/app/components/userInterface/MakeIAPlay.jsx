import React, { useCallback, useEffect, useRef, useState } from 'react'
import {} from 'prop-types'

import Button from '../Button'

import { useGame } from '../providers/gameProvider'
import { useGrid } from '../providers/gridProvider'
import { grid as gridActions, game as gameActions } from '../../actions/creators/index.ts'

import { nextPlayer } from '../../utils/gameUtils'
import { set } from '../../utils/array3D'

import IAWorker from '../../workers/IAWorker.worker'

const MakeIAPlay = () => {
    const [{ current_player, players }, dispatchToGame] = useGame()
    const [{ grid }, dispatchToGrid] = useGrid()

    const worker = useRef(null)
    const [move, setMove] = useState(null)

    useEffect(() => {
        if (worker.current !== null) worker.current.terminate()

        worker.current = new IAWorker()

        setMove(null)
        worker.current.onmessage = ({ data: move }) => setMove(move)

        worker.current.postMessage({
            gameState: grid,
            player: current_player,
            players,
        })
    }, [grid, current_player, players])

    const playAsIA = useCallback(
        move => {
            const newGrid = set(grid, move, current_player)

            dispatchToGrid(gridActions.set(newGrid))
            dispatchToGame(gameActions.updateWinner(newGrid, move, current_player))
            dispatchToGrid(gridActions.resetSelection())
            dispatchToGame(gameActions.setCurrentPlayer(nextPlayer(current_player, players)))
        },
        [grid, current_player, players]
    )

    return <Button onClick={() => playAsIA(move)} active={move !== null} label="Let the IA Play" />
}

export default MakeIAPlay
