import React from 'react'
import Cell from './Cell.jsx'

function Cube({ hoverPosition, focusCondition, onHoverMove, onClick }) {
    return (
        <>
            <axesHelper args={[5]} />
            <mesh position={hoverPosition}>
                <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial attach="material" color={'white'} />
            </mesh>

            {new Array(27).fill(0).map((_, index) => {
                const x = (index % 3) - 1
                const y = 1 - (Math.floor(index / 3) % 3)
                const z = Math.floor(index / 9) - 1
                const position = [x, y, z]
                return (
                    <Cell
                        position={position}
                        key={index}
                        onHoverMove={onHoverMove}
                        focus={focusCondition(position)}
                        onClick={onClick}
                    ></Cell>
                )
            })}
        </>
    )
}

export default Cube
