import { Array3D, set, all } from './array3D'
import { Coords } from './coords'
import { getAvailableMoves, checkWin, nextPlayer } from './gameUtils'

export function computeMove(
    gameState: Array3D,
    player: number,
    players: Array<number>,
    depth: number
): Coords {
    const minmax = (
        current_state: Array3D,
        current_depth: number,
        current_player: number,
        alpha: number,
        beta: number
    ): [number, Coords] => {
        const { min, max } = Math
        // if is terminal state, return the state score (move is handled on upper call)
        const [won, score] = evalState(current_state, current_player)
        if (won || current_depth <= 0) return [(score * max(current_depth, 1)) / depth, null]

        let bestScore: number, bestMove: Coords

        if (current_player === player) {
            // maximizing player
            bestScore = -Infinity
            bestMove = null

            for (const move of getAvailableMoves(current_state)) {
                const next_state = set(current_state, move, current_player)
                const [moveScore, _] = minmax(
                    next_state,
                    current_depth - 1,
                    nextPlayer(current_player, players),
                    alpha,
                    beta
                )

                // update max
                if (moveScore > bestScore) {
                    bestScore = moveScore
                    bestMove = move
                    alpha = max(alpha, moveScore)
                }

                // prunning
                if (alpha >= beta) break
            }
        } else {
            // minimizing player
            bestScore = +Infinity
            bestMove = null

            for (const move of getAvailableMoves(current_state)) {
                const next_state = set(current_state, move, current_player)
                const [moveScore, _] = minmax(
                    next_state,
                    current_depth - 1,
                    nextPlayer(current_player, players),
                    alpha,
                    beta
                )

                // update min
                if (moveScore < bestScore) {
                    bestScore = moveScore
                    bestMove = move
                    beta = min(beta, moveScore)
                }

                // prunning
                if (alpha >= beta) break
            }
        }

        return [bestScore, bestMove]
    }

    const [_, move] = minmax(gameState, depth, player, -Infinity, +Infinity)
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
