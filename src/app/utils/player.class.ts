import IPlayer from './IPlayer.interface'
import ImmutableMatrix3D from './matrix.class'
import Coords from './coords.type'

export default class Player implements IPlayer {
    getPlayedCoords(gameState: ImmutableMatrix3D<any>): Promise<Coords> {
        return Promise.resolve({ x: 0, y: 0, z: 0 })
    }
}
