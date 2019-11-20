import React from 'react'
import './cross.sass'

function SvgCross({ className }) {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={`cross ${className}`}
            x="0px"
            y="0px"
            viewBox="0 0 169.7 168.3"
        >
            <line x1="8.5" y1="161.2" x2="162.6" y2="7.1" />
            <line x1="161.2" y1="161.2" x2="7.1" y2="7.1" />
        </svg>
    )
}

export default SvgCross
