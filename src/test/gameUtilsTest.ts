import { getAvailableMoves, checkWin } from '../app/utils/gameUtils'
import 'babel-polyfill'

const testGameState = [
    [
        [1, null, 2],
        [null, null, 2],
        [null, null, 1],
    ],
    [
        [1, null, null],
        [null, 1, null],
        [2, null, null],
    ],
    [
        [2, null, 1],
        [1, null, null],
        [2, null, 2],
    ],
]

const availableMoves = [
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: 1, z: 1 },
    { x: 0, y: 2, z: 0 },
    { x: 0, y: 2, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 1, y: 0, z: 2 },
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 1, z: 2 },
    { x: 1, y: 2, z: 1 },
    { x: 1, y: 2, z: 2 },
    { x: 2, y: 0, z: 1 },
    { x: 2, y: 1, z: 1 },
    { x: 2, y: 1, z: 2 },
    { x: 2, y: 2, z: 1 },
]

test('should getAvailableMove give all the coords of the case where value is null', () => {
    const moves = getAvailableMoves(testGameState)
    expect(moves).toEqual(availableMoves)
})

test('should checkWin return false when last move did not win', () => {
    const result = checkWin(testGameState, { x: 0, y: 0, z: 0 })
    expect(result).toBe(false)
})

const winningHorizGameState = [
    [
        [1, null, null],
        [1, null, null],
        [1, null, null],
    ],
    [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
]

test('should checkWin return true when horizontal line of 3', () => {
    const result = checkWin(winningHorizGameState, { x: 0, y: 0, z: 0 })
    expect(result).toBe(true)
})

const winningDiagonalGameState = [
    [
        [1, null, null],
        [null, null, null],
        [null, null, null],
    ],
    [
        [null, null, null],
        [null, 1, null],
        [null, null, null],
    ],
    [
        [null, null, null],
        [null, null, null],
        [null, null, 1],
    ],
]

test('should checkWin return true when diagonal line of 3', () => {
    const result = checkWin(winningDiagonalGameState, { x: 0, y: 0, z: 0 })
    expect(result).toBe(true)
})

test('should checkWin return true when checking form the midle of the line', () => {
    const result = checkWin(winningDiagonalGameState, { x: 1, y: 1, z: 1 })
    expect(result).toBe(true)
})
