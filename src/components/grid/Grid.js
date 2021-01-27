import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import { Transition, animated, interpolate } from 'react-spring/renderprops'

export default class Grid extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        keys: PropTypes.func,
        occupySpace: PropTypes.bool,
        columns: PropTypes.number,
        margin: PropTypes.number,
        heights: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        lockScroll: PropTypes.bool,
        closeDelay: PropTypes.number,
    }
    static defaultProps = {
        occupySpace: true,
        columns: 3,
        margin: 0,
        heights: 400,
        lockScroll: false,
        closeDelay: 0,
      }

    state = { width: 0, height: 0, open: undefined, lastOpen: undefined }
    
    componentDidUpdate(){
        this.clicked = false
    }
    render(){
        
        let {
            children,
            columns,
            margin,
            occupySpace,
            impl,
            config,
            data,
            keys,
            heights,
            closeDelay,
            lockScroll,
            ...rest
          } = this.props
          let { lastOpen, open, width } = this.state
          let columnHeights=new Array(columns).fill(0)
          
          let displayData=data.map((child,i)=>{
              console.log("iiiii",i)
              console.log("columnHeights",columnHeights)
              let index=columnHeights.indexOf(Math.min(...columnHeights))
              console.log("index",index)
              let cellWidth=width/columns -margin
              console.log("cellWidth",cellWidth)
              let left=cellWidth*index
              console.log("left",left)
              let offset=(index+1)*margin
              console.log("offset", offset)
              let top=columnHeights[index] + margin
              console.log("top", top)
              console.log("typeof", typeof heights)
              let height = typeof heights === 'function' ? heights(child) : heights
              console.log("height", height)
            })

        return (
            <div >
                {children}
            </div>
        )
    }
}