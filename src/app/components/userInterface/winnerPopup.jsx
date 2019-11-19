import React from 'react'
import { any } from 'prop-types'

const WinnerPopup = props => {
    const { winner } = props

    const resetGame = () => {}

    return (
        <div className="winner-popup">
            <h1>player {winner.toString()} won</h1>
            <button onClick={resetGame}>Play again</button>
        </div>
    )
}

WinnerPopup.propTypes = {
    winner: any,
}

export default WinnerPopup
