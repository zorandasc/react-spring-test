import React, { Component }  from 'react';
import Grid from '../components/Grid'
import { Slug, Fade } from '../components/GridPrimitives'
import data from "../constants/gridData"
import styled from "../components/gridPage.module.css"

class Cell extends Component {
    render(){
        const {toggle, active , name, description, css}=this.props
        return (
            <div 
                className={styled.cell} 
                style={{backgroundImage:css}}>
                <Fade>
                    <div className={styled.default}>
                        <div style={{zIndex:1}}>{name}</div>
                    </div>
                </Fade>
            </div>)
    }
}



export default class App extends Component {
       // state={data}
        render(){
            return (
                <main className={styled.main}>
                <div className={styled.grid}>
                    {data.map(dat=>(
                        <div 
                            key={dat.name} 
                            className={styled.cell} 
                            style={{backgroundImage:dat.css}}>
                            <div className={styled.default}>
                                <div style={{zIndex:1}}>{dat.name}</div>
                            </div>
                        </div>))}
                </div>
                </main>
            )
                
        }

}