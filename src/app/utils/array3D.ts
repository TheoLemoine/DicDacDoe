import _ from 'lodash'

export type Array3D = Array<Array<Array<any>>>
export type Array2D = Array<Array<any>>
export type Array1D = Array<any>
export type Array3DMapCallback = (
    coords: Coords,
    elem: any,
    index: number
) => any
export type Coords = { x: number; y: number; z: number }

export function makeEmpty(
    deep: number,
    lenght: number,
    empty: any
): Array<any> {
    if (deep === 0) return empty

    return new Array(lenght).fill(makeEmpty(deep - 1, lenght, empty))
}

export function clone(array: Array3D): Array3D {
    return _.cloneDeep<Array3D>(array)
}

export function get(array: Array3D, at: Coords): void {
    const { x, y, z } = at
    return array[x][y][z]
}

export function set(array: Array3D, at: Coords, value: any): any {
    const { x, y, z } = at
    const newArray = clone(array)
    newArray[x][y][z] = value
    return newArray
}

export function map(array3D: Array3D, callback: Array3DMapCallback): Array3D {
    return array3D.map<Array3D>((array2D: Array2D, x: number) =>
        array2D.map((array1D: Array1D, y: number) =>
            array1D.map((elem: any, z: number) =>
                callback({ x, y, z }, elem, parseInt(`${y}${z}${x}`, 3))
            )
        )
    )
}
