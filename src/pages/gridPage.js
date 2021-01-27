import React, { Component }  from 'react';
import { config } from 'react-spring/renderprops'

import Grid from '../components/grid/grid'
import { Slug, Fade } from '../components/grid/GridPrimitives'
import data from "../constants/gridData"
import styled from "../components/grid/gridPage.module.css"

class Cell extends Component {
    render(){
        const {toggle, active , name, description, css}=this.props
        return (
            <div 
                className={styled.cell} 
                style={{backgroundImage:css}}>
                    <div className={styled.details}>
                        <div className={styled.circle} style={{background:css}}></div>
                        <div className={styled.close}>
                            <span style={{cursor:"pointer"}}>X</span>
                        </div>
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </div>
                    <div className={styled.default}>
                        <div style={{zIndex:1}}>{name}</div>
                    </div>
                
            </div>)
    }
}



export default class App extends Component {
       state={data}
        render(){
            return (
                <main className={styled.main}>
                    <Grid 
                        className={styled.grid}
                        // Arbitrary data, should contain keys, possibly heights, etc.
                        data={this.state.data}
                        // Key accessor, instructs grid on how to fet individual keys from the data set
                        keys={d=>d.name}
                        // Can be a fixed value or an individual data accessor
                        heights={d=>d.height}
                        // Number of columns
                        columns={2}
                        // Space between elements
                        margin={30}
                        // Removes the possibility to scroll away from a maximized element
                        lockScroll={false}
                        // Delay when active elements (blown up) are minimized again
                        closeDelay={500}
                        // Regular react-spring configs
                        config={config.slow}
                        >
                        {data.map(dat=>(
                            <Cell key={dat.name} {...dat} active={false} toggle={false}>
                            </Cell>
                            )
                          )
                        }
                    </Grid>
                </main>
            )
                
        }

}