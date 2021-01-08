import React, { useState } from 'react';
import styled from "styled-components"
import { useSprings, animated,interpolate,config } from 'react-spring'

import Layout from "../components/layout"
//import Slide from "../components/Slide"
import slides from "../components/slideData"

const trans=(x,r)=>`perspective(1000px) translateX(calc(100% * ${x})) rotateY(calc(-45deg*${r}))`

const Mojslider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const from =i=>({x:0,rot:0})
    const to=i=>{
        let index=slides.length + (slideIndex - i)
        return {x:index, rot:index === 0 ? 0 : index > 0 ? 1 : -1 }}


    const [springs, setSprings] = useSprings([...slides, ...slides, ...slides].length,
        i => ({ ...to(i), from: { ...from(i) }, config: config.wobbly }))

    const handleNext = () => {
        setSlideIndex((slideIndex + 1) % 5)
        setSprings(i => ({ ...to(i) }))
    }
    const handlePrev = () => {
        setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1)
        setSprings(i => ({ ...to(i) }))

    }

    return (
        <Layout>
            <Wrapper>
                <div className="slides">
                    {springs.map(({ x, rot }, i) => {
                        //i ide od 0 do 3*length
                        //const active = offset === 0 ? true : null;

                        return (
                            <animated.div key={i} className="slide"
                                style={{

                                }} >
                                <animated.div className="slideContent"
                                    style={{
                                        backgroundImage: `url(${slides[i % slides.length].image})`,
                                        transform:interpolate([x,rot], trans )
                                    }}>

                                </animated.div>
                            </animated.div>
                        )
                    })}
                    <button className="prev" onClick={handlePrev}>PREV</button>
                    <button className="next" onClick={handleNext}>NEXT</button>
                </div>
                <div className="drugiSektor"></div>
            </Wrapper>
        </Layout>
    );
};



const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
    .slides{
        width:100vw;
        height:100vh;
        display:grid;
        justify-content:center;
        align-items:center;   
    }
    .slide{
        grid-area:1/-1;
    }

    .slideContent {
        width:30vw;
        height:40vw;
        background-size:cover;
        background-position:center center;
        background-repeat:no-repeat;
        transform-style:preserve-3d;
    }
    .slideBackground{
        position:fixed;
        top:0;
        left: -10%;
        right: -10%;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        z-index: -1;
        opacity:0;
    }

    button{
        background: transparent;
        border: none;
        color: white;
        position: absolute;
        font-size: 1rem;
        width: 5rem;
        height: 5rem;
        top: 80%;
        opacity:0.7;
        z-index: 5;
    }
    .prev{
        left:10%;
    }
    .next{
        right:10%;
    }

    .drugiSektor{
        background-color:hotpink;
        width:100vw;
        height:100vh;
    }
  
  `


export default Mojslider;