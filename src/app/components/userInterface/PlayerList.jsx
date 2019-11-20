import React from 'react'

function PlayerList() {
    const [{ current_player, players }] = useGame()
    return (
        <div className="player-list">
            {players.map(player => (
                <span>Joueur {player}</span>
            ))}
        </div>
    )
}
