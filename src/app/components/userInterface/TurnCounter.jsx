import React from 'react'
import { useTransition, animated } from 'react-spring'

function TurnCounter({ turn }) {
    const transitions = useTransition(turn, null, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(10px)' },
    })

    return (
        <div className="hud-turn">
            Turn&nbsp;
            {transitions.map(({ item, key, props }) => (
                <animated.span className="hud-turn-number" key={key} style={props}>
                    {item}
                </animated.span>
            ))}
            <span className="hud-turn-stretcher">0</span>
        </div>
    )
}

export default TurnCounter
