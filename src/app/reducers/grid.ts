import { GRID } from '../actions/types/index'
import { Array3D, set, makeEmpty } from '../utils/array3D'
import * as Coords from '../utils/coords'

export type GridState = {
    grid: Array3D
    selectedPlane: number | null
    hoveredPlane: number | null
    hoveredCell: Coords.Coords | null
}

export default (state: GridState, action: any) => {
    switch (action.type) {
        case GRID.SET:
            const { grid } = action
            return { ...state, grid }

        case GRID.RESET:
            return { ...state, grid: makeEmpty(3, 3, null) }

        case GRID.SET_HOVERED_PLANE:
            const { plane: hoveredPlane } = action
            return hoveredPlane == state.hoveredPlane ? state : { ...state, hoveredPlane }

        case GRID.SET_SELECTED_PLANE:
            const { plane: selectedPlane } = action
            return selectedPlane == state.selectedPlane ? state : { ...state, selectedPlane }

        case GRID.SET_HOVERED_CELL:
            const { cell: hoveredCell } = action
            if (hoveredCell === state.hoveredCell) {
                return state
            }
            if (hoveredCell === null || state.hoveredCell === null) {
                return { ...state, hoveredCell }
            }
            if (Coords.equals(hoveredCell, state.hoveredCell)) {
                return state
            }
            return { ...state, hoveredCell }

        case GRID.RESET_SELECTION:
            return {
                ...state,
                hoveredCell: null,
                hoveredPlane: null,
                selectedPlane: null,
            }

        default:
            return state
    }
}
