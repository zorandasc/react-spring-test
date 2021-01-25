import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import { Transition, animated, interpolate } from 'react-spring/renderprops'

export default class Grid extends React.Component {

    componentDidUpdate(){}
    render(){
        let {children}=this.props
        //console.log(children)
        return (
            <div>
                {children}
            </div>
        )
    }
}