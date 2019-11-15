import React, { useReducer, createContext } from 'react'
import grid from '../../reducers/grid.ts'
import { makeEmpty } from '../../utils/array3D'

const GridContext = createContext(null)

export const GridProvider = ({ children }) => {
    const [state, dispatch] = useReducer(grid, makeEmpty(3, 3, null))

    return (
        <GridContext.Provider value={[state, dispatch]}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContext
