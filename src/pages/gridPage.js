import React, { Component }  from 'react';
import { config } from 'react-spring/renderprops'

import Grid from '../components/grid/grid'
import { Slug, Fade } from '../components/grid/GridPrimitives'
import data from "../constants/gridData"
import styled from "../components/grid/gridPage.module.css"

//cell vrsi tranziju na gore
class Cell extends Component {
    render(){
        const {toggle, active , name, description, css}=this.props
        return (
            <div 
                className={styled.cell} 
                style={{backgroundImage:css,cursor: !active ? 'pointer' : 'auto'}}
                //moze se kliknuti na celiju samo u pocetnom polozaju
                onClick={!active?toggle:undefined}>
                    <Fade show={active} delay={active ? 500 : 0}>
                        <div className={styled.details}>
                            <Slug delay={600}>
                                <div className={styled.circle} style={{background:css}}></div>
                                <div className={styled.close}>
                                    <span 
                                        style={{cursor:"pointer"}} 
                                        onClick={toggle}>X</span>
                                </div>
                                <h1>{name}</h1>
                                <p>{description}</p>
                            </Slug>
                        </div>
                    </Fade>
                    <Fade 
                        show={!active}
                        from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
                        enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                        leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
                        delay={active ? 0 : 400}>
                        <div className={styled.default}>
                            <div style={{zIndex:1}}>{name}</div>
                        </div>
                    </Fade>
                
            </div>)
    }
}


//grid vrsi tranziciju na desno
export default class App extends Component {
       state={data}
        render(){
            return (
             
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
                        config={config.slow}>
                        {/*JAKO VAZNO CHILDREN OD GRIDA JE FUNKCIJA
                        KOJA PRIMA DATA ,ACTIVE TOGGLE A VRACA 
                        CELLL*/}
                        {(data, active,toggle)=>(
                            <Cell {...data} active={active} toggle={toggle}></Cell>
                        )}
                    </Grid>
                
            )
                
        }

}