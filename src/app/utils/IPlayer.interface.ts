import { Array3D, Coords } from './array3D'

export default interface IPlayer {
    play(gameState: Array3D): Promise<Coords>
}
