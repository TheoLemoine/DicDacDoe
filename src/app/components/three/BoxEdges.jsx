import React, { useEffect, useState } from 'react'
import { BoxBufferGeometry } from 'three'
import { animated } from 'react-spring/three'

function BoxEdges({ opacity, position, size }) {
    const [geometry, setGeometry] = useState(null)

    useEffect(() => {
        setGeometry(new BoxBufferGeometry(...size))
    }, [size])

    return (
        <animated.lineSegments position={position}>
            {geometry !== null && <edgesGeometry attach="geometry" args={[geometry]} />}
            <lineBasicMaterial
                attach="material"
                color={0xffffff}
                transparent={true}
                opacity={opacity}
                depthWrite={false}
            />
        </animated.lineSegments>
    )
}

export default BoxEdges
