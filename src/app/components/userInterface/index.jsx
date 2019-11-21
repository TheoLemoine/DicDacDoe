import React from 'react'

import './index.sass'
import { useGame } from '../providers/gameProvider'
import WinnerPopup from './WinnerPopup'
import MakeIAPlay from './MakeIAPlay'
import PlayerList from './PlayerList'
import { useTransition } from 'react-spring'

const UserInterface = () => {
    const [{ players, current_player, winner }] = useGame()

    const transition = useTransition(winner, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
        <div className="hud-container">
            {transition.map(
                ({ item, key, props }) =>
                    item !== null && <WinnerPopup key={key} winner={item} style={props} />
            )}
            <PlayerList currentPlayer={current_player} players={players} />
            <div className="hud-ia-play">
                <MakeIAPlay />
            </div>
        </div>
    )
}

export default UserInterface
