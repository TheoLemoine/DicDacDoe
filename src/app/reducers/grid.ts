import { GRID } from '../actions/types/index'
import { Array3D, set, makeEmpty } from '../utils/array3D'

export default (grid: Array3D, action: any) => {
    switch (action.type) {
        case GRID.ADD:
            const { coords, value } = action
            return set(grid, coords, value)

        case GRID.RESET:
            return makeEmpty(3, 3, null)

        default:
            return grid
    }
}
