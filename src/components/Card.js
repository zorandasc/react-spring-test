import React from 'react';
import styled from "styled-components"
import {useSpring, animated} from "react-spring";

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans=(x,y,s)=>`perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


const Card = () => {
    const [props, set]=useSpring(()=>({xys:[0,0,1], config:{mass:5,tension:350,friction:40}}))
    return (
        <Wrapper
        className="card"
        onMouseMove={({clientX:x, clientY:y})=>{set({xys:calc(x,y)})}}
        onMouseLeave={()=>{set({xys:[0,0,1]})}}
        style={{transform:props.xys.interpolate(trans)}}
        >
        </Wrapper>
    );
};

const Wrapper=styled(animated.div)`
    width: 45ch;
    height: 45ch;
    background: gray;
    border-radius: 5px;
    background-image: url(https://drscdn.500px.org/photo/435236/q%3D80_m%3D1500/v2?webp=true&sig=67031bdff6f582f3e027311e2074be452203ab637c0bd21d89128844becf8e40);
    background-size: cover;
    background-position: center center;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s;
    will-change: transform;
    border: 15px solid white;
    &::hover{
        box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
    }

`


export default Card;