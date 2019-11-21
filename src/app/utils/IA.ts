import { Array3D, set, all, filter, flatten } from './array3D'
import { Coords } from './coords'
import { getAvailableMoves, checkWin, nextPlayer, getLineCombo } from './gameUtils'

export function computeMove(
    gameState: Array3D,
    player: number,
    players: Array<number>,
    depth: number
): Coords {
    const alpha = -Infinity
    const beta = Infinity

    const minmax = (
        gameState: Array3D,
        current_depth: number,
        current_player: number
    ): [number, Coords] => {
        const moves = getAvailableMoves(gameState)

        const scores = moves.map(move => {
            const nextGameState = set(gameState, move, current_player)

            let [won, score] = evalState(nextGameState, current_player)

            if (won || current_depth >= depth) {
                score *= Math.max(depth - current_depth, 1) / depth
            } else {
                score = minmax(
                    nextGameState,
                    current_depth + 1,
                    nextPlayer(current_player, players)
                )[0]
            }

            return score // reverse the score for next player
        })

        const bestScore = current_player === player ? Math.max(...scores) : Math.min(...scores)

        const bestMove = moves[scores.indexOf(bestScore)]

        return [bestScore, bestMove]
    }

    const [score, move] = minmax(gameState, 0, player)
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
