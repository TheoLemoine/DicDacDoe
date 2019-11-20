import { useEffect } from 'react'

export default (callback: () => {}, timeout: number) => {
    useEffect(() => {
        const interval = setInterval(callback, timeout)
        return () => clearInterval(interval)
    }, [])
}
