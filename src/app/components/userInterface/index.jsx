import React, { useContext } from 'react'

import './index.sass'
import { useGame } from '../providers/gameProvider'
import WinnerPopup from './winnerPopup'

const UserInterface = () => {
    const [game, dispatch] = useGame()
    const { current_player, players, winner } = game

    return (
        <div className="hud-container">
            <h1 className="hud-current-player">
                Au joueur {String(current_player)}
            </h1>
            {winner !== null && <WinnerPopup winner={winner} />}
        </div>
    )
}

export default UserInterface
