import React from 'react'
import Cell from './Cell.jsx'
import { map } from '../../utils/array3D.ts'

import { useGrid } from '../providers/gridProvider'
import HoverCube from './HoverCube'

function Cube() {
    const [{ hoveredPlane, selectedPlane, grid }] = useGrid()

    const show = (hoveredPlane !== null && selectedPlane === null) || selectedPlane !== null

    return (
        <>
            {map(grid, ({ x, y, z }, value, index) => {
                const position = [x, y, z].map(c => c - 1)
                return <Cell key={index} position={position} player={value}></Cell>
            })}
            {show && <HoverCube hoveredPlane={hoveredPlane} />}
        </>
    )
}

export default Cube
