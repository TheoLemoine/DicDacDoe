import { combineReducers } from 'redux'
import grid from './grid.ts'
import game from './game.ts'

export default combineReducers({
    grid,
    game,
})
