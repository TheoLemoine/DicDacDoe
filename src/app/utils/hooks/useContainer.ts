import {useRef, useEffect} from 'react'

export default (root: HTMLElement) => {
    const container = useRef(document.createElement('div'))
    useEffect(() => {
        root.appendChild(container.current)
        return () => root.removeChild(container.current)
    }, [])

    return container
}