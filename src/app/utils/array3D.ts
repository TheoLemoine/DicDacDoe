import { Coords } from './coords'

export type Array3D = Array<Array2D>
export type Array2D = Array<Array1D>
export type Array1D = Array<any>
export type Array3DMapCallback = (coords: Coords, elem: any, index: number) => any
export type Array3DFilterCallback = (coords: Coords, elem: any) => boolean

export function makeEmpty(deep: number, lenght: number, empty: any): Array<any> {
    if (deep === 0) return empty

    return new Array(lenght).fill(makeEmpty(deep - 1, lenght, empty))
}

export function clone(array: Array3D): Array3D {
    return map(array, (_, e) => e)
}

export function get(array: Array3D, at: Coords): any {
    const { x, y, z } = at
    return array[x][y][z]
}

export function set(array: Array3D, at: Coords, value: any): Array3D {
    const { x, y, z } = at
    const newArray = clone(array)
    newArray[x][y][z] = value
    return newArray
}

export function map(array3D: Array3D, callback: Array3DMapCallback): Array3D {
    const newArray3D: Array3D = []

    for (let x = 0; x < array3D.length; x++) {
        const newRow = []
        for (let y = 0; y < array3D[x].length; y++) {
            const newCol = []
            for (let z = 0; z < array3D[x][y].length; z++) {
                const elem = array3D[x][y][z]
                const newElem = callback({ x, y, z }, elem, parseInt(`${y}${z}${x}`, 3))
                newCol.push(newElem)
            }
            newRow.push(newCol)
        }
        newArray3D.push(newRow)
    }

    return newArray3D
}

export function filter(array3D: Array3D, callback: Array3DFilterCallback): Array3D {
    const newArray3D: Array3D = []

    for (let x = 0; x < array3D.length; x++) {
        const newRow = []
        for (let y = 0; y < array3D[x].length; y++) {
            const newCol = []
            for (let z = 0; z < array3D[x][y].length; z++) {
                const elem = array3D[x][y][z]
                if (callback({ x, y, z }, elem)) newCol.push(elem)
            }
            newRow.push(newCol)
        }
        newArray3D.push(newRow)
    }

    return newArray3D
}

export function* all(array3D: Array3D) {
    for (let x = 0; x < array3D.length; x++) {
        for (let y = 0; y < array3D[x].length; y++) {
            for (let z = 0; z < array3D[x][y].length; z++) {
                yield [array3D[x][y][z], { x, y, z }]
            }
        }
    }
}

export function flatten(array3D: Array3D): Array1D {
    const flatArray: Array1D = []

    for (const [elem] of all(array3D)) {
        flatArray.push(elem)
    }

    return flatArray
}

export function coordsIn(array3D: Array3D, coords: Coords) {
    // array 3D is expected to be a cube
    // so the lenght is the first array lenght

    for (const axis in coords) {
        const coord = coords[axis]
        if (coord < 0 || coord >= array3D.length) return false
    }
    return true
}
