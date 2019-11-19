import { GRID } from '../actions/types/index'
import { Array3D, set, makeEmpty } from '../utils/array3D'

export default (grid: Array3D, action: any) => {
    switch (action.type) {
        case GRID.ADD:
            const { coords, value } = action
            return set(grid, coords, value)

        case GRID.RESET:
            return makeEmpty(3, 3, null)

        case GRID.SET_HOVERED_PLANE:
        // const { plane } = action
        // return plane == state.hoveredPlane ? plane : {...stateContext, hoveredPlane: plane}

        case GRID.SET_SELECTED_PLANE:
        // const { plane } = action
        // return plane == state.selectedPlane ? plane : {...stateContext, selectedPlane: plane}

        case GRID.SET_HOVERED_CELL:
        // const { cell } = action
        // return Coords.equals(cell, state.hoveredCell) ? cell : {...stateContext, hoveredCell: cell}

        default:
            return grid
    }
}
