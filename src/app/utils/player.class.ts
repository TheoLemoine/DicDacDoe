import IPlayer from './IPlayer.interface'
import { Array3D, Coords } from './array3D'

export default class Player implements IPlayer {
    play(gameState: Array3D): Promise<Coords> {
        return Promise.resolve({ x: 0, y: 0, z: 0 })
    }
}
