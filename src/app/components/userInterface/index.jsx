import React, { useContext } from 'react'

import './index.sass'
import GameContext from '../providers/gameProvider'

const UserInterface = () => {
    const [game, dispatch] = useContext(GameContext)
    const { current_player, players, winner } = game

    return (
        <div className="hud-container">
            <h1 className="hud-current-player">
                Au joueur {current_player.toString()}
            </h1>
            {winner && <WinnerPopup winner={winner} />}
        </div>
    )
}

export default UserInterface
