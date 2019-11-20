import { Array3D, set, all, filter, flatten } from './array3D'
import { Coords } from './coords'
import { getAvailableMoves, checkWin, nextPlayer } from './gameUtils'

export function computeMove(
    gameState: Array3D,
    player: number,
    players: Array<number>,
    depth: number
): Coords {
    const minmax = (
        gameState: Array3D,
        current_depth: number,
        current_player: number
    ): [number, Coords] => {
        const moves = getAvailableMoves(gameState)

        const scores = moves.map(move => {
            const nextGameState = set(gameState, move, player)
            const [won, score] = evalState(nextGameState, player)

            if (won || current_depth <= 0) {
                const depthFactor = current_depth / depth
                return (current_player === player ? score : -score) * depthFactor
            } else {
                const [score] = minmax(
                    nextGameState,
                    current_depth - 1,
                    nextPlayer(current_player, players)
                )
                return score
            }
        })

        const bestScore = Math.max(...scores)
        const bestMove = moves[scores.indexOf(bestScore)]

        return [bestScore, bestMove]
    }

    const [_, move] = minmax(gameState, depth, player)
    return move
}

export function evalState(gameState: Array3D, player: number): [boolean, number] {
    for (const [elem, coords] of all(gameState)) {
        if (elem === player && checkWin(gameState, coords)) {
            return [true, 10]
        }
    }

    // for now, non winning states just return false and give no points
    // TODO : analyse state and give a score according to possible combos
    return [false, 0]
}
