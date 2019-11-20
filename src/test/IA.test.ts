import { computeMove, evalState } from '../app/utils/IA'

const gameState = [
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

test('should compute move return what ?', () => {
    const move = computeMove(gameState, 0, [0, 1], 1)
    //expect(move).toEqual({ x: 0, y: 0, z: 0 })
})
