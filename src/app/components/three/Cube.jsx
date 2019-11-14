import React from 'react'
import Cell from './Cell.jsx'

function Cube({ hoverPosition, focusArea, onHoverMove, onClick }) {

    const isInArea = (position, area) => position.reduce((acc, cur, i) => (area[i] == null || cur == area[i]) && acc, true)

    return (
        <>
            <axesHelper args={[5]} />
            <mesh position={hoverPosition}>
                <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial attach="material" color={'white'} />
            </mesh>

            {new Array(27).fill(0).map((_, index) => {
                const [x, z, y] = index.toString(3).padStart(3, '0').split('').map(c => c - 1)
                const position = [x, y, z]
                return (
                    <Cell
                        position={position}
                        key={index}
                        onHoverMove={onHoverMove}
                        focus={isInArea(position, focusArea)}
                        onClick={onClick}
                    ></Cell>
                )
            })}
        </>
    )
}

export default Cube
