import React from 'react'

import './index.sass'
import { useGame } from '../providers/gameProvider'
import WinnerPopup from './WinnerPopup'
import MakeIAPlay from './MakeIAPlay'

const UserInterface = () => {
    const [{ current_player, winner }] = useGame()

    return (
        <div className="hud-container">
            <h1 className="hud-current-player">Au joueur {String(current_player)}</h1>
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
