import { GRID } from '../actions/types/index'

import ImmutableMatrix3D from '../../utils/matrix.class'

const emptyMatrix = new ImmutableMatrix3D<number>(3, 0)

export default (matrix = emptyMatrix, action) => {
    switch (action.type) {
        case GRID.ADD_POINT:
            const { coords, value } = action
            return matrix.set(coords, value)

        case GRID.RESET:
            return emptyMatrix
    }
}
