import React from 'react';
import { useTrail, animated } from 'react-spring'
import styled from "styled-components"


import Layout from "../components/layout"


const trans=(x,y)=>`translate3d(${x}px, ${y}px, 0)`


const Blob = () => {
    const [trail, set, stop] = useTrail(3, () => ({xy:[0,0]}))
    return (
      <Layout>
          <Wrapper>
              <div className="hooks">
                {trail.map((props, index) => 
                    <animated.div 
                        key={index} 
                        style={{transform:props.xy.interpolate(trans)}}>kurec</animated.div>)}
            </div>
        </Wrapper>
    </Layout>
              

           
    );
};

const Wrapper = styled.div`
  overscroll-behavior-y: contain;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkolivegreen;
  .hooks{
      border:2px solid black;
      position:absolute;
      will-change: transform;
      border-radius: 50%;
        background: lightcoral;
        box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
        opacity: 0.6;

  }
  `


export default Blob;