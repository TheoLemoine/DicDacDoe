import React from 'react'
function PlayerLabel({ label, isCurrent, additionalClass }) {
    return (
        <h1 className={`player-label ${additionalClass} ${isCurrent ? 'current-player' : null}`}>
            {label}
        </h1>
    )
}

export default PlayerLabel
