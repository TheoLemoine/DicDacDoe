import React, { useReducer, createContext, useContext } from 'react'
import grid, { SelectionStates } from '../../reducers/grid.ts'
import { makeEmpty } from '../../utils/array3D'

export const GridContext = createContext(null)

export const GridProvider = ({ children }) => {
    const [state, dispatch] = useReducer(grid, {
        grid: makeEmpty(3, 3, null),
        selectedPlane: null,
        hoveredPlane: null,
        hoveredCell: null,
        selectionState: SelectionStates,
    })

    return (
        <GridContext.Provider value={[state, dispatch]}>
            {children}
        </GridContext.Provider>
    )
}

export const useGrid = () => useContext(GridContext)
