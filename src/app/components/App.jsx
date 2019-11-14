import React from 'react'
import CanvasApp from './CanvasApp'

function App() {
    return <CanvasApp />
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
