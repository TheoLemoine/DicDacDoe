import {
    makeEmpty,
    clone,
    get,
    set,
    map,
    filter,
    flatten,
    coordsIn,
} from '../app/utils/array3D'

// array3D mockup for test
const testArray = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 42, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
]

test('should makeEmpty with a deepness and length of 2 return a 2*2 array', () => {
    const emptyArray = makeEmpty(2, 2, 0)
    expect(emptyArray).toEqual([
        [0, 0],
        [0, 0],
    ])
})

test('should clone make a new object', () => {
    const cloneArray = clone(testArray)
    expect(cloneArray).not.toBe(testArray)
})

test('should get at (1,1,1) access the center item', () => {
    const num = get(testArray, { x: 1, y: 1, z: 1 })
    expect(num).toBe(42)
})

const modifiedArray = [
    [
        [43, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 42, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
]

test('should set at (0, 0, 0) change the correct value', () => {
    const newArray = set(testArray, { x: 0, y: 0, z: 0 }, 43)
    expect(newArray).toEqual(modifiedArray)
})

test('should set be immutable', () => {
    const newArray = set(testArray, { x: 0, y: 0, z: 0 }, 43)
    expect(newArray).not.toBe(testArray)
})

const incrementedArray = [
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 43, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
]

test('should map with an increment return an incremented array', () => {
    const newArray = map(testArray, (coords, elem, index) => {
        return elem + 1
    })
    expect(newArray).toEqual(incrementedArray)
})

test('should map be immutable', () => {
    const newArray = map(testArray, (coords, elem, index) => {
        return elem
    })
    expect(newArray).not.toBe(testArray)
})

const no0Array = [
    [[], [], []],
    [[], [42], []],
    [[], [], []],
]

test('should filter 0s on the array give an array without 0s', () => {
    const newArray = filter(testArray, (coords, elem) => elem !== 0)
    expect(newArray).toEqual(no0Array)
})

test('should filter be immutable', () => {
    const newArray = filter(testArray, (coords, elem) => true)
    expect(newArray).not.toBe(testArray)
})

const flattenedArray = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    42,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
]

test('should flatten return a flatened array', () => {
    const newArray = flatten(testArray)
    expect(newArray).toEqual(flattenedArray)
})

test('should coordsIn returns true when coords are in array limits', () => {
    const isInArray = coordsIn(testArray, { x: 1, y: 2, z: 0 })
    expect(isInArray).toBe(true)
})

test('should coordsIn returns false when coords are in out limits', () => {
    const isInArray = coordsIn(testArray, { x: 14, y: 8, z: 16 })
    expect(isInArray).toBe(false)
})
