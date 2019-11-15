import { Array3D, filter, flatten, map } from './array3D'
import { Coords } from './coords'

export function getAvailableMoves(array3D: Array3D): Array<Coords> {
    const notPlayedCoords = map(array3D, (coords, elem) =>
        elem === null ? coords : null
    )
    const availableMovesCoords = filter(
        notPlayedCoords,
        (_, elem) => elem !== null
    )
    return flatten(availableMovesCoords)
}

/**
 * generate all 3D direction arround a 0/0/0 origin point (for a 3D matrix)
 */
function* get3DArroundVectors(): Iterable<Coords> {
    for (const decimalNumber of new Array(3 * 3 * 3).keys()) {
        const [x, y, z] = decimalNumber
            .toString(3)
            .padStart(3, '0')
            .split('')
            .map(num => parseInt(num) - 1)

        if (x === 0 && y === 0 && z === 0) continue
        else yield { x, y, z }
    }
}

export function checkWin(array3D: Array3D, lastMove: Coords): null | any {
    for (const vect of get3DArroundVectors()) {
        // check forward and backward then add
    }
}
