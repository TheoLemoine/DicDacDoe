import React from 'react'
import Cell from './Cell.jsx'
import { map } from '../../utils/array3D.ts'

function Cube({ grid }) {
    return (
        <>
            {map(grid, ({ x, y, z }, value, index) => {
                const position = [x, y, z].map(c => c - 1)
                return (
                    <Cell key={index} position={position} player={value}></Cell>
                )
            })}
        </>
    )
}

export default Cube
