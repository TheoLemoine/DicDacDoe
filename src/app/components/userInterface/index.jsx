import React from 'react'

import './index.sass'
import { useGame } from '../providers/gameProvider'
import WinnerPopup from './WinnerPopup'
import MakeIAPlay from './MakeIAPlay'
import PlayerList from './PlayerList'

const UserInterface = () => {
    const [{ players, current_player, winner }] = useGame()

    return (
        <div className="hud-container">
            <PlayerList currentPlayer={current_player} players={players} />
            {winner === null && (
                <div className="hud-ia-play">
                    <MakeIAPlay />
                </div>
            )}
            {winner !== null && <WinnerPopup winner={winner} />}
        </div>
    )
}

export default UserInterface
