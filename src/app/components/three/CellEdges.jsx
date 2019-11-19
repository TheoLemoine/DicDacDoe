import React, { useEffect, useState } from 'react'
import { BoxBufferGeometry } from 'three'

function CellEdges({ opacity, position }) {
    const [geometry, setGeometry] = useState(null)

    useEffect(() => {
        setGeometry(new BoxBufferGeometry(0.9999, 0.9999, 0.9999))
    }, [])

    return (
        <lineSegments position={position}>
            {geometry !== null && (
                <edgesGeometry
                    attach="geometry"
                    args={[geometry]}
                ></edgesGeometry>
            )}
            <lineBasicMaterial
                attach="material"
                color={0xffffff}
                transparent={true}
                opacity={opacity}
            />
        </lineSegments>
    )
}

export default CellEdges
