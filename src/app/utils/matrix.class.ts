import _ from 'lodash'
import { Vector3 } from 'three'

interface ArrayGrid3D<T> extends Array<Array<Array<T>>> {}

export default class ImmutableMatrix3D<T> {
    private arrayModel: ArrayGrid3D<T>

    constructor(lenght = 3, emptyValue: T) {
        this.arrayModel = this.buildArrayModel(3, lenght, emptyValue)
    }

    public clone() {
        return _.cloneDeep(this.arrayModel)
    }

    public get({ x, y, z }): T {
        return this.arrayModel[x][y][z]
    }

    public set({ x, y, z }, value: T): ArrayGrid3D<T> {
        const newMatrix = this.clone()

        newMatrix[x][y][z] = value
        return newMatrix
    }

    private buildArrayModel(
        deepness: number,
        lenght: number,
        emptyValue: T
    ): any {
        if ((deepness = 0)) return emptyValue

        return new Array(lenght).fill(
            this.buildArrayModel(deepness - 1, lenght, emptyValue)
        )
    }
}
