import React, { useState } from 'react';
import styled from "styled-components"
//import { useSpring, animated } from 'react-spring'

import Layout from "../components/layout"
import Slide from "../components/Slide"
import slides from "../components/slideData"

const Mojslider = () => {
    const [slideIndex, setSlideIndex] = useState(0)


    const handleNext = () => {
        setSlideIndex((slideIndex + 1) % slides.length)
    }
    const handlePrev = () => {

        slideIndex === 0 ?
            setSlideIndex(slides.length - 1) :
            setSlideIndex(slideIndex - 1)

    }

    return (
        <Layout>
            <Wrapper>
                <div className="slides">


                    {[...slides, ...slides, ...slides].map((slide, i) => {
                        let offset = slides.length + (slideIndex - i)
                        const active = offset === 0 ? true : null;
                        let dir = offset === 0 ? 0 : offset > 0 ? 1 : -1
                        return (
                            <div className="slide" >
                                <div className="slideBackground"
                                    style={{
                                        backgroundImage: `url('${slide.image}')`,
                                        transform: `translateX(calc(10% * ${dir}))`
                                    }}>
                                </div>
                                <div className="slideContent"
                                    style={{
                                        backgroundImage: `url('${slide.image}')`,
                                        transform: `perspective(1000px) 
                                translateX(calc(100% * ${offset}))
                                rotateY(calc(-45deg * ${dir}))
                                `
                                    }}>
                                    <div className="slideContentInner">
                                        <h2 className="slideTitle">{slide.title}</h2>
                                        <h3 className="slideSubtitle">{slide.subtitle}</h3>
                                        <p className="slideDescription">{slide.description}</p>
                                    </div>
                                </div>
                            </div>
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