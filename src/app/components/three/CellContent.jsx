import React, { useRef } from 'react'
import { useRender } from 'react-three-fiber'

function CellContent({ children }) {
    const object3DRef = useRef()
    useRender(() => {
        object3DRef.current.rotation.y += 0.001
        object3DRef.current.rotation.x += 0.0015
    })

    return <object3D ref={object3DRef}>{children}</object3D>
}

export default CellContent
