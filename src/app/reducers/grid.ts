import { GRID } from '../actions/types/index'
import { Array3D, set, makeEmpty } from '../utils/array3D'
import { Coords } from '../utils/coords'

export type GridState = {
    grid: Array3D
    selectedPlane: number | null
    hoveredPlane: number | null
    hoveredCell: Coords | null
}

export enum SelectionStates {
    PLANE,
    CELL,
}

export default (state: GridState, action: any) => {
    switch (action.type) {
        case GRID.ADD:
            const { coords, value } = action
            return { ...state, grid: set(state.grid, coords, value) }

        case GRID.RESET:
            return { ...state, grid: makeEmpty(3, 3, null) }

        default:
            return state
    }
}
