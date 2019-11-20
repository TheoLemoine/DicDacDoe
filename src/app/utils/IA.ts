import { Array3D, set } from './array3D'
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
        maxDepth: number,
        current_player: number
    ): [number, Coords] => {
        const moves = getAvailableMoves(gameState)

        const scores = moves.map(move => {
            const [won, score] = evalState(set(gameState, move, player), player)

            if (won || maxDepth <= 0) {
                return current_player === player ? score : -score
            } else {
                const [score] = minmax(gameState, maxDepth - 1, nextPlayer(current_player, players))
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
    // TODO: eval state function: give a grade to the state for the player who last played
    return [false, 5]
}
