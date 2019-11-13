// react
import { render } from 'react-dom'
import React from 'react'
// redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// app
import App from './components/App.jsx'
import reducer from './redux/reducers/index'

const store = createStore(reducer, applyMiddleware(thunk))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
