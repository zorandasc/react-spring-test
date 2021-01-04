import React from 'react';
import { useTrail, animated } from 'react-spring'
import styled from "styled-components"


import Layout from "../components/layout"

const fast = { tension: 1200, friciton: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%,-50%,0)`


const Blob = () => {
  //generisi tri traila sa startnim pozicijama 0,0 absolutno pozicionirani
  //congig objekat za prvi startuj brzo ostali sporo
  const [trail, set, stop] = useTrail(3, () => ({ xy: [0, 0], config: i => (i === 0 ? fast : slow) }))
  return (
    <Layout>
      <Wrapper>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30"></feGaussianBlur>
            <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"></feColorMatrix>
          </filter>
        </svg>
        <div className="hooks" onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
          {trail.map((props, index) =>
            <animated.div
              key={index}
              style={{ transform: props.xy.interpolate(trans) }}></animated.div>)}
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
  margin: 0;
  padding: 0;
  overflow: hidden;

  //svg{
  //  display:none;
  //}

  .hooks{
    border:2px solid white;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* URL to SVG filter */
    filter:url('#goo')
  }



  .hooks >div{  
    cursor: grab;
      position:absolute;
      will-change: transform;
      border-radius: 50%;
      background: lightcoral;
      box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  }

  .hooks>div:nth-child(1){
    width: 120px;
    height: 120px;
  }
  .hooks > div:nth-child(2) {
    width: 250px;
    height: 250px;
}

.hooks > div:nth-child(3) {
  width: 150px;
  height: 150px;
}
.hooks >div::after{
  content:"";
  position:absolute;
  top:20px;
  left:20px;
  width:40px;
  height:40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}
.hooks> div:nth-child(2)::after {
  top: 70px;
  left: 70px;
  width: 70px;
  height: 70px;
}

.hooks> div:nth-child(3)::after {
  top: 50px;
  left: 50px;
  width: 50px;
  height: 50px;
}
  `


export default Blob;