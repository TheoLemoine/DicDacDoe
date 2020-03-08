import { computeMove } from '../utils/IA'

onmessage = message => {
    const { gameState, player, players, turn } = message.data
    const move = computeMove(gameState, player, players, 5, 6 - turn)
    postMessage(move)
}
