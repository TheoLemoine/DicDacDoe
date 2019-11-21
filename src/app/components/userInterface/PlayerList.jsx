import React from 'react'

function PlayerList({ currentPlayer, players }) {
    return (
        <div className="player-list">
            {players.map((player, index) => (
                <h1 key={index}>
                    Joueur {player} {player === currentPlayer && 'joue'}
                </h1>
            ))}
        </div>
    )
}

export default PlayerList
