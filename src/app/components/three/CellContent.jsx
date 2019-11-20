import React, { useRef, useEffect } from 'react'
import { useRender } from 'react-three-fiber'
import { useTransition } from 'react-spring/three'

function CellContent({ opacity, ContentComponent }) {
    const object3DRef = useRef()

    useEffect(() => {
        object3DRef.current.rotation.y = Math.PI * Math.random()
        object3DRef.current.rotation.x = Math.PI * Math.random()
    }, [])

    useRender(() => {
        object3DRef.current.rotation.y += 0.001
        object3DRef.current.rotation.x += 0.0015
    })

    const transitions = useTransition(ContentComponent, null, {
        from: { scale: [0.01, 0.01, 0.01] },
        enter: { scale: [1, 1, 1] },
        leave: { scale: [0.01, 0.01, 0.01] },
    })

    return (
        <object3D ref={object3DRef}>
            {transitions.map(({ item: Item, key, props }) => {
                return (
                    Item != null && (
                        <Item
                            position={[0, 0, 0]}
                            opacity={opacity}
                            scale={props.scale}
                            key={key}
                        />
                    )
                )
            })}
        </object3D>
    )
}

export default CellContent
