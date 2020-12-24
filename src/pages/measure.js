import React , {useState}from 'react';
import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

import useMeasure from "../helper/useMeasure"

import Layout from "../components/layout"

const Measure = () => {
    const [open, toggle]=useState(false)
    const [bind, {width}]=useMeasure()
    const props=useSpring({width:open?width:0})
    return (
        <Layout>
            <Wrapper>
                <div {...bind} className="main" onClick={()=>toggle(!open)}>
                    <animated.div className="fill" style={props}></animated.div>
                    <animated.div className="content">{props.width.interpolate(x=>x.toFixed(0))}</animated.div>
               </div>
            </Wrapper>
            
        </Layout>
    );
};


const Wrapper = styled.div`

width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #272727;
  .main{
      position:relative;
      width:200px;
      height:50px;
      background: #272727;
      border: 2px solid white;
      cursor: pointer;
      border-radius: 5px;
      overflow: hidden;
  }
  .fill{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:hotpink;
  }
  .content{
      position:absolute;
      top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  }
  `

export default Measure;