import { GRID } from '../actions/types/index'
import { Array3D, set, makeEmpty } from '../utils/array3D'

export const defaultState = makeEmpty(3, 3, null)

export default (grid: Array3D, action: any) => {
    switch (action.type) {
        case GRID.ADD:
            const { coords, value } = action
            console.log(set(grid, coords, value))
            console.log(coords)
            return set(grid, coords, value)

        case GRID.RESET:
            return defaultState

        default:
            return grid
    }
}
