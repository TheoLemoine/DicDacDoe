import React, { Context } from 'react'
import { component, instanceOf } from 'prop-types'

/**
 * wrapper that allow to pass context over
 * to the three-fiber part of the VDOM
 */
const ContextBridge = ({ over, context, children }) => {
    render(
        <context.Consumer>
            {value => {
                over.render(
                    <context.Provider value={value}>
                        {children}
                    </context.Provider>
                )
            }}
        </context.Consumer>
    )
}

ContextBridge.propTypes = {
    Over: component.isRequired,
    Context: instanceOf(Context).isRequired,
}

export default ContextBridge
