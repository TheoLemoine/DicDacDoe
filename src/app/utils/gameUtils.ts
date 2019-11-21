import { Array3D, filter, flatten, map, coordsIn, get, all } from './array3D'
import { Coords, add, multiplyBy, indexToCoords } from './coords'

export const NEEDED_COMBO = 3

export function getAvailableMoves(array3D: Array3D): Array<Coords> {
    const notPlayedCoords = map(array3D, (coords, elem) => (elem === null ? coords : null))
    const availableMovesCoords = filter(notPlayedCoords, (_, elem) => elem !== null)
    return flatten(availableMovesCoords)
}

/**
 * generate all 3D direction arround a (0 0 0) origin point (for a 3D matrix)
 */
function* get3DArroundVectors(): Iterable<Coords> {
    for (const decimalNumber of new Array(3 * 3 * 3).keys()) {
        const { x, y, z } = add(indexToCoords(decimalNumber), {
            x: -1,
            y: -1,
            z: -1,
        })

        if (x === 0 && y === 0 && z === 0) continue
        else yield { x, y, z }
    }
}

export function checkWin(array3D: Array3D, from: Coords): boolean {
    const val = get(array3D, from)

    for (const vect of get3DArroundVectors()) {
        let combo = 1
        combo += getLineCombo(array3D, val, from, vect, 0)
        combo += getLineCombo(array3D, val, from, multiplyBy(vect, -1), 0)

        if (combo >= NEEDED_COMBO) return true
    }

    return false
}

export function getLineCombo(
    array3D: Array3D,
    val: any,
    from: Coords,
    direction: Coords,
    count: number
): number {
    const to = add(from, direction)
    if (coordsIn(array3D, to) && get(array3D, to) === val) {
        return getLineCombo(array3D, val, to, direction, count + 1)
    } else {
        return count
    }
}

export function nextPlayer(player: any, players: Array<any>) {
    return players[(players.indexOf(player) + 1) % players.length]
}
