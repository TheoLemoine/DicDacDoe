import React from 'react'
import { Canvas } from 'react-three-fiber'
// import { connect } from 'react-redux'

import Scene from './three/Scene.jsx'
import Controls from './three/Controls.jsx'

function App() {
    return (
        <Canvas style={{ height: '100vh' }}>
            <Scene />
            <Controls />
        </Canvas>
    )
}

// connect(
//     (state, props) => {
//         return {
//             grid: state.grid,
//         }
//     },
//     (dispatch, props) => {
//         return {
//             onPlayerClick(id) {
//                 dispatch(grid.resolvePlayerID(id))
//             },
//         }
//     }
// )(App)

export default App
