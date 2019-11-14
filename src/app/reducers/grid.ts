import { GRID } from '../actions/types/index'
import ImmutableMatrix3D from '../utils/matrix.class'

export const defaultState = new ImmutableMatrix3D<number>(3, 0)

export default (matrix: ImmutableMatrix3D<number>, action: any) => {
    switch (action.type) {
        case GRID.ADD:
            const { coords, value } = action
            return matrix.set(coords, value)

        case GRID.RESET:
            return defaultState

        default:
            return matrix
    }
}
