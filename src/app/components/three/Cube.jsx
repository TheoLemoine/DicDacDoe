import React from 'react'
import Cell from './Cell.jsx'
import { map } from '../../utils/array3D.ts'

const isInArea = (position, area) =>
    position.reduce(
        (acc, cur, i) => (area[i] == null || cur == area[i]) && acc,
        true
    )

const isInPlane = (position, plane) => {
    if (plane == null) return true
    const axes = ['x', 'y', 'z']
    const axis = axes.indexOf(plane.axis)
    return position[axis] == plane.value
}

function Cube({ focusArea, onHoverMove, onClick, selectedPlane, grid }) {
    return (
        <>
            {map(grid, ({ x, y, z }, value, index) => {
                const position = [x, y, z].map(c => c - 1)
                const inPlane = isInPlane(position, selectedPlane)
                return (
                    <Cell
                        position={position}
                        key={index}
                        onHoverMove={onHoverMove}
                        onClick={onClick}
                        stopPropagation={inPlane}
                        focus={isInArea(position, focusArea)}
                        visible={inPlane}
                        player={value}
                    ></Cell>
                )
            })}
        </>
    )
}

export default Cube
