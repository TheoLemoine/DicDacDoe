import { computeMove } from '../utils/IA'

onmessage = message => {
    const { gameState, player, players } = message.data
    const move = computeMove(gameState, player, players, 5)
    postMessage(move)
}
