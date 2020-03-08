import { Array3D, set, all } from './array3D'
import { Coords } from './coords'
import { getAvailableMoves, nextPlayer, checkWin } from './gameUtils'

export function computeMove(
    gameState: Array3D,
    player: number,
    players: Array<number>,
    depth: number,
    turns_before_check: number
): Coords {
    const minimax = (
        current_state: Array3D,
        current_depth: number,
        current_player: number,
        alpha: number,
        beta: number,
        turns_before_check: number
    ): [number, Coords] => {
        const { min, max } = Math

        // dont check for winners until someone can actualy win
        if (turns_before_check <= 0 || current_depth <= 0) {
            const [game_over, score] = evalState(current_state, player)
            if (game_over || current_depth <= 0) {
                // further wins have lower priority than closer ones
                const depthFactor = (current_depth + depth) / (depth + depth)
                return [score * depthFactor, null]
            }
        }

        let bestScore: number, bestMove: Coords

        if (current_player === player) {
            // maximizing player
            bestScore = -Infinity
            bestMove = null

            for (const move of getAvailableMoves(current_state)) {
                const next_state = set(current_state, move, current_player)

                const [moveScore, _] = minimax(
                    next_state,
                    current_depth - 1,
                    nextPlayer(current_player, players),
                    alpha,
                    beta,
                    turns_before_check - 1
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

                const [moveScore, _] = minimax(
                    next_state,
                    current_depth - 1,
                    nextPlayer(current_player, players),
                    alpha,
                    beta,
                    turns_before_check - 1
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

    const [_, move] = minimax(gameState, depth, player, -Infinity, +Infinity, turns_before_check)
    return move
}

function evalState(gameState: Array3D, player: number): [boolean, number] {
    for (const [elem, coords] of all(gameState)) {
        if (elem && checkWin(gameState, coords)) {
            if (elem === player) return [true, 10]
            else return [true, -10]
        }
    }

    return [false, 0]
}
