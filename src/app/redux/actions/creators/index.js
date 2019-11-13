import { GRID } from '../types'

export const grid = {
    add(coords, value) {
        return {
            type: GRID.ADD,
            coords,
            value,
        }
    },
    reset() {
        return {
            type: GRID.RESET,
        }
    },
}

export default {
    grid,
}
