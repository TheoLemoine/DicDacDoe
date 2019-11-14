import ImmutableMatrix3D from './matrix.class'
import Coords from './coords.type'

export default interface IPlayer {
    getPlayedCoords(gameState: ImmutableMatrix3D<any>): Promise<Coords>
}
