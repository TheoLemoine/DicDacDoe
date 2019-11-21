import React, { useRef, useEffect } from 'react'
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass })

function Effects() {
    const { gl, scene, camera, size } = useThree()
    const composer = useRef()
    const fxaaPass = useRef()

    useEffect(() => {
        const pixelRatio = composer.current.renderer.getPixelRatio()
        console.log(pixelRatio)
        const uniforms = fxaaPass.current.material.uniforms
        uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio)
        uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio)
    }, [fxaaPass, composer])

    useEffect(() => void composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)

    const params = {
        // exposure: 1.098,
        exposure: 1.098,
        bloomThreshold: 0,
        bloomStrength: 0.5,
        bloomRadius: 0,
    }

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" args={[scene, camera]} />
            <shaderPass attachArray="passes" ref={fxaaPass} renderToScreen args={[FXAAShader]} />
            <unrealBloomPass attachArray="passes" renderToScreen {...params} />
        </effectComposer>
    )
}

export default Effects
