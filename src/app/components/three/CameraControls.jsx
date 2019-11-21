import React, { useRef, useEffect, useState } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Color } from 'three'

extend({ OrbitControls })

function Controls() {
    const controlsRef = useRef()
    const { camera, gl, scene } = useThree()
    // const [cubeTexture, setCubeTexture] = useState(null)

    // useEffect(() => {
    //     var loader = new CubeTextureLoader()
    //     loader.setPath('assets/')

    //     setCubeTexture(
    //         loader.load([
    //             'bottom.png',
    //             'other.png',
    //             'other.png',
    //             'other.png',
    //             'other.png',
    //             'other.png',
    //         ])
    //     )
    // }, [])

    useEffect(() => {
        scene.background = new Color(0, 0, 0)
    }, [scene])

    useFrame(() => controlsRef.current && controlsRef.current.update())

    return (
        <orbitControls
            ref={controlsRef}
            args={[camera, gl.domElement]}
            enableRotate
            enablePan={false}
            maxDistance={10}
            minDistance={5}
        />
    )
}

export default Controls
