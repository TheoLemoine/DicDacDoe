import {
    add,
    multiplyBy,
    indexToCoords,
    coordsToIndex,
    equals,
} from '../app/utils/coords'

const coords1 = { x: -2, y: 8, z: 7 }
const coords2 = { x: 6, y: -4, z: 7 }

test('should adding coords return the addition of coords', () => {
    const newCoords = add(coords1, coords2)
    expect(newCoords).toEqual({ x: 4, y: 4, z: 14 })
})

test('should multiplying coords by -1 return the oposite of coords', () => {
    const newCoords = multiplyBy(coords1, -1)
    expect(newCoords).toEqual({ x: 2, y: -8, z: -7 })
})

const coords = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 2, y: 1, z: 0 },
]

test('should converting index from 0 to 5 to coords work', () => {
    for (const i of coords.keys()) {
        const coord = indexToCoords(i)
        expect(coord).toEqual(coords[i])
    }
})

test('should converting 6 first coords to index shold give numbers from 0 to 5', () => {
    for (const i of coords.keys()) {
        const index = coordsToIndex(coords[i])
        expect(index).toBe(i)
    }
})

test('should equals return true if x, y and z of two coords are equals', () => {
    const result = equals(
        { x: 1.32, y: 53, z: 8.31 },
        { x: 1.32, y: 53, z: 8.31 }
    )
    expect(result).toBe(true)
})

test('should equals return false if x, y and z of two coords are not equals', () => {
    const result = equals(
        { x: 92.3, y: 10, z: 9.13 },
        { x: 72.32, y: 32.21, z: 10 }
    )
    expect(result).toBe(false)
})
