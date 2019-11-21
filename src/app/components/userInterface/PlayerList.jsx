import React from 'react'
import PlayerLabel from './PlayerLabel'
import SvgCross from './SvgCross'
import './playerList.sass'

function PlayerList({ currentPlayer, players }) {
    return (
        <div className="player-list">
            {players.map((player, index) => (
                <PlayerLabel
                    key={index}
                    label={`Joueur ${player}`}
                    isCurrent={player === currentPlayer}
                    additionalClass={player === 1 ? 'player-one' : 'player-two'}
                />
            ))}
        </div>
    )
}

export default PlayerList
