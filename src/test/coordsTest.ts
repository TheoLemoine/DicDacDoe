import * as coordUtils from '../app/utils/coords'

const coords1 = { x: -2, y: 8, z: 7 }
const coords2 = { x: 6, y: -4, z: 7 }

test('should adding coords return the addition of coords', () => {
    const newCoords = coordUtils.add(coords1, coords2)
    expect(newCoords).toEqual({ x: 4, y: 4, z: 14 })
})

test('should multiplying coords by -1 return the oposite of coords', () => {
    const newCoords = coordUtils.multiplyBy(coords1, -1)
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
        const coord = coordUtils.indexToCoords(i)
        expect(coord).toEqual(coords[i])
    }
})

test('should converting 6 first coords to index shold give numbers from 0 to 5', () => {
    for (const i of coords.keys()) {
        const index = coordUtils.coordsToIndex(coords[i])
        expect(index).toBe(i)
    }
})
