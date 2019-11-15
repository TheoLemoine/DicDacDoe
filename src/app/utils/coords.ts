export type Coords = { x: number; y: number; z: number }

export function add(coords1: Coords, coords2: Coords): Coords {
    return {
        x: coords1.x + coords2.x,
        y: coords1.y + coords2.y,
        z: coords1.z + coords2.z,
    }
}

export function multiplyBy(coords: Coords, factor: number) {
    return {
        x: coords.x * factor,
        y: coords.y * factor,
        z: coords.z * factor,
    }
}