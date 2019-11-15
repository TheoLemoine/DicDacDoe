import React, { useReducer } from 'react'
import Cell from './Cell.jsx'
import GridReducer, { defaultState } from '../../reducers/grid.ts'
import { map } from '../../utils/array3D.ts'

function Cube({
    hoverPosition,
    focusArea,
    onHoverMove,
    onClick,
    selectedPlane,
}) {
    const [gridState, dispatch] = useReducer(GridReducer, defaultState)

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

    return (
        <>
            <axesHelper args={[5]} />
            <mesh position={hoverPosition}>
                <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial attach="material" color={'white'} />
            </mesh>

            {map(gridState, ({ x, y, z }, value, index) => {
                const position = [x, y, z].map(c => c - 1)
                return (
                    <Cell
                        position={position}
                        key={index}
                        onHoverMove={onHoverMove}
                        onClick={onClick}
                        stopPropagation={isInPlane(position, selectedPlane)}
                        focus={isInArea(position, focusArea)}
                        visible={isInPlane(position, selectedPlane)}
                        player={value}
                    ></Cell>
                )
            })}
        </>
    )
}

export default Cube
