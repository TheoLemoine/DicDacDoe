import { computeMove } from '../app/utils/IA'

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

test('should computing move not generate a stack overflow...', () => {
    const move = computeMove(gameState, 1, [1, 2], 4)
})
