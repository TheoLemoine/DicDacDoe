import React from 'react'
import { createPortal } from 'react-dom'
import useContainer from '../../utils/hooks/useContainer'
import { useGame } from '../providers/gameProvider'
import { useTransition, animated, useSpring } from 'react-spring'
import './cursor.sass'
import SvgCross from './SvgCross'

const cursorRoot = document.getElementById('cursor-root')

const transformMessage = message => {
    switch (message) {
        case 'Disabled':
            return null
        case 'Cancel':
            return <SvgCross className="cursor-cross" />
        default:
            return message
    }
}

const CursorSmooth = ({ x, y, message }) => {
    const [{ current_player }] = useGame()

    const transformedMessage = transformMessage(message)

    const getCorrespondingProps = message => {
        switch (message) {
            case null:
                return {
                    transform: 'scale3d(0.1, 0.1, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    left: x - 27,
                    top: y - 27,
                    borderColor: 'rgb(255, 255, 255)',
                }

            case 'Play':
                return {
                    transform: 'scale3d(1, 1, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    left: x - 27,
                    top: y + 27,
                    borderColor: current_player === 1 ? 'rgb(17, 102, 255)' : 'rgb(204, 60, 0)',
                }

            case 'Disabled':
                return {
                    transform: 'scale3d(0.3, 0.3, 0.3)',
                    backgroundColor: 'rgba(127, 127, 127, 1)',
                    left: x - 27,
                    top: y - 27,
                    borderColor: 'rgb(255, 255, 255)',
                }

            case 'Cancel':
                return {
                    transform: 'scale3d(0.5, 0.5, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    left: x - 27,
                    top: y + 8,
                    borderColor: 'rgb(255, 255, 255)',
                }

            default:
                return {
                    transform: 'scale3d(1, 1, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    left: x - 27,
                    top: y + 27,
                    borderColor: current_player === 1 ? 'rgb(17, 102, 255)' : 'rgb(204, 60, 0)',
                }
        }
    }

    const transitions = useTransition(transformedMessage, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const props = useSpring({ ...getCorrespondingProps(message, current_player) })

    const container = useContainer(cursorRoot)

    return createPortal(
        <animated.div className="cursor cursor-message" style={props}>
            {transitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.span className="cursor-message-text" key={key} style={props}>
                            {item}
                        </animated.span>
                    )
            )}
        </animated.div>,
        container.current
    )
}

export default CursorSmooth
